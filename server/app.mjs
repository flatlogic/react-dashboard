import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

// Keep the deployed Query contract. Mutations were disabled in the original demo.
const schema = buildSchema(`
  type Post { id: ID!, title: String, content: String, updatedAt: String }
  type User { id: ID!, email: String }
  type NewsItem { title: String!, link: String!, author: String, pubDate: String!, content: String }
  type Query { me: User, news: [NewsItem], posts: [Post] }
`);

export function createApp({
  jwtSecret,
  databaseUrl,
  staticDirectory = path.resolve('dist'),
  secureCookies = false,
  newsUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml',
}) {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is required. Reuse the deployment secret to preserve existing sessions.');
  }
  if (!databaseUrl.startsWith('sqlite:')) {
    throw new Error('DATABASE_URL must be a sqlite: URL.');
  }
  // Fail on a missing database/table instead of silently replacing deployment data.
  const database = new DatabaseSync(databaseUrl.slice('sqlite:'.length), { readOnly: true });
  const posts = database.prepare('SELECT id, title, content, updatedAt FROM Post');
  const app = express();
  app.locals.database = database;
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cookieParser());
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  const cookieOptions = { httpOnly: true, secure: secureCookies, sameSite: 'lax', path: '/' };

  const sessionFor = (payload) => ({
    token: '', // Authentication is carried by the HttpOnly cookie, never localStorage.
    user: { id: payload.id || payload.login, login: payload.login, name: 'Administrator' },
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  });

  app.post('/login', (req, res) => {
    const { login, password } = req.body;
    if (login !== 'user' || password !== 'password') {
      return res.status(401).json({ message: 'Use demo credentials: user / password' });
    }
    const token = jwt.sign({ id: 'demo-user', login }, jwtSecret, { algorithm: 'HS256', expiresIn: '180d' });
    res.cookie('id_token', token, { ...cookieOptions, maxAge: 180 * 24 * 60 * 60 * 1000 });
    res.set('Cache-Control', 'no-store');
    // Preserve id_token for existing API clients; the new UI only uses session.
    res.json({ id_token: token, session: sessionFor(jwt.decode(token)) });
  });

  app.post('/logout', (_req, res) => {
    res.clearCookie('id_token', cookieOptions);
    res.status(204).end();
  });

  app.use(['/session', '/graphql'], (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    jwt.verify(req.cookies.id_token, jwtSecret, { algorithms: ['HS256'] }, (error, payload) => {
      if (error) {
        res.status(401).json({ message: 'Your session has expired. Please log in again.' });
        return;
      }
      req.user = payload;
      next();
    });
  });
  app.get('/session', (req, res) => res.json(sessionFor(req.user)));

  let newsItems;
  let newsFetchedAt = 0;
  const rootValue = {
    me: (_args, { user }) => ({ id: user.id || user.login, email: user.email }),
    posts: () => posts.all().map((post) => ({
      ...post,
      updatedAt: new Date(post.updatedAt).toISOString(),
    })),
    news: async () => {
      if (Date.now() - newsFetchedAt < 10 * 60 * 1000) {
        return newsItems;
      }
      const response = await fetch(newsUrl, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) {
        throw new Error(`News feed returned HTTP ${response.status}`);
      }
      const data = await response.json();
      if (data.status !== 'ok' || !Array.isArray(data.items)) {
        throw new Error('News feed returned an invalid response');
      }
      newsItems = data.items;
      newsFetchedAt = Date.now();
      return newsItems;
    },
  };
  app.all('/graphql', createHandler({
    schema,
    rootValue,
    context: (request) => ({ user: request.raw.user }),
  }));
  app.use(express.static(staticDirectory));
  app.get('/{*path}', (_req, res) => res.sendFile(path.join(staticDirectory, 'index.html')));
  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  });
  return app;
}
