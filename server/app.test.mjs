import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { spawnSync } from 'node:child_process';
import jwt from 'jsonwebtoken';
import { createApp } from './app.mjs';

const directory = mkdtempSync(path.join(tmpdir(), 'react-dashboard-test-'));
const filename = path.join(directory, 'legacy.sqlite');
const secret = 'test-only-secret-not-for-deployment';
let app;
let server;
let origin;
let newsServer;
let newsRequests = 0;
let originalDatabase;

before(async () => {
  // Match the existing Sequelize table name, UUIDs and date format.
  const db = new DatabaseSync(filename);
  db.exec(`CREATE TABLE Post (id UUID PRIMARY KEY, title VARCHAR(255), content TEXT,
    createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL);
    INSERT INTO Post VALUES ('legacy-post', 'Existing post', 'Saved content',
    '2026-02-10 14:29:45.000 +00:00', '2026-02-10 14:29:45.000 +00:00');`);
  db.close();
  originalDatabase = readFileSync(filename);
  writeFileSync(path.join(directory, 'index.html'), '<html>Dashboard</html>');
  newsServer = createServer((_req, res) => {
    newsRequests++;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok', items: [{ title: 'News', link: 'https://example.com', pubDate: '2026-11-16' }] }));
  }).listen(0, '127.0.0.1');
  await once(newsServer, 'listening');
  app = createApp({ jwtSecret: secret, databaseUrl: `sqlite:${filename}`, staticDirectory: directory,
    newsUrl: `http://127.0.0.1:${newsServer.address().port}`, secureCookies: true });
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await Promise.all([new Promise((resolve) => server.close(resolve)), new Promise((resolve) => newsServer.close(resolve))]);
  app.locals.database.close();
  assert.deepEqual(readFileSync(filename), originalDatabase, 'API must not change the existing database');
});

const legacyCookie = () => `id_token=${jwt.sign({ user: false, login: 'user' }, secret, { expiresIn: '1h' })}`;
const query = (queryText, cookie = legacyCookie()) => fetch(`${origin}/graphql`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie },
  body: JSON.stringify({ query: queryText }),
});

test('login rejects invalid credentials and issues a secure cookie plus the legacy token field', async () => {
  const login = (password) => fetch(`${origin}/login`, { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: 'user', password }) });
  assert.equal((await login('wrong')).status, 401);
  const response = await login('password');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /HttpOnly/);
  assert.match(response.headers.get('set-cookie'), /Secure/);
  assert.match(response.headers.get('set-cookie'), /SameSite=Lax/);
  const body = await response.json();
  assert.equal(jwt.verify(body.id_token, secret).login, 'user');
  assert.equal(body.session.user.id, 'demo-user');
  assert.equal(body.session.token, '');
  const session = await fetch(`${origin}/session`, { headers: { Cookie: response.headers.get('set-cookie').split(';')[0] } });
  assert.equal((await session.json()).user.login, 'user');
});

test('GraphQL and session reject missing, tampered, expired and wrong-algorithm tokens', async () => {
  for (const token of ['', 'forged', jwt.sign({ login: 'user' }, secret, { expiresIn: -1 }),
    jwt.sign({ login: 'user' }, secret, { algorithm: 'HS384' })]) {
    assert.equal((await query('{ posts { id } }', `id_token=${token}`)).status, 401);
    assert.equal((await fetch(`${origin}/session`, { headers: { Cookie: `id_token=${token}` } })).status, 401);
  }
});

test('old login tokens can read existing posts and me, including aliases and variables', async () => {
  const response = await fetch(`${origin}/graphql`, { method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: legacyCookie() },
    body: JSON.stringify({ query: 'query Read($include: Boolean!) { saved: posts { id title content updatedAt } me @include(if: $include) { id email } }', variables: { include: true } }) });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.errors, undefined);
  assert.deepEqual(result.data.saved, [{ id: 'legacy-post', title: 'Existing post', content: 'Saved content', updatedAt: '2026-02-10T14:29:45.000Z' }]);
  assert.deepEqual(result.data.me, { id: 'user', email: null });
});

test('GraphQL GET queries and news cache preserve the original query contract', async () => {
  for (let i = 0; i < 2; i++) {
    const response = await fetch(`${origin}/graphql?query=${encodeURIComponent('{ news { title link pubDate } }')}`, { headers: { Cookie: legacyCookie() } });
    const result = await response.json();
    assert.equal(result.errors, undefined);
    assert.equal(result.data.news[0].title, 'News');
  }
  assert.equal(newsRequests, 1);
});

test('mutations remain disabled and invalid fields return GraphQL errors', async () => {
  const result = await (await query('mutation { addPost(title: "x", content: "y") { id } }')).json();
  assert.ok(result.errors.length > 0);
  const invalid = await (await query('{ nonexistent }')).json();
  assert.ok(invalid.errors.length > 0);
});

test('logout clears the same cookie and SPA routes still serve the build', async () => {
  const response = await fetch(`${origin}/logout`, { method: 'POST', headers: { Cookie: legacyCookie() } });
  assert.equal(response.status, 204);
  assert.match(response.headers.get('set-cookie'), /id_token=;/);
  assert.match(response.headers.get('set-cookie'), /Path=\//);
  assert.equal(await (await fetch(`${origin}/app/posts`)).text(), '<html>Dashboard</html>');
});

test('startup fails on a missing secret or database', () => {
  assert.throws(() => createApp({ jwtSecret: '', databaseUrl: `sqlite:${filename}` }), /JWT_SECRET/);
  assert.throws(() => createApp({ jwtSecret: secret, databaseUrl: `sqlite:${directory}/missing.sqlite` }), /unable to open/);
});

test('explicit initialization creates the compatible table and refuses an existing file', () => {
  const fresh = path.join(directory, 'fresh.sqlite');
  const options = { encoding: 'utf8', env: { ...process.env, DATABASE_URL: `sqlite:${fresh}` } };
  assert.equal(spawnSync(process.execPath, ['server/init-db.mjs'], options).status, 0);
  const db = new DatabaseSync(fresh, { readOnly: true });
  assert.equal(db.prepare('SELECT count(*) AS count FROM Post').get().count, 0);
  db.close();
  const second = spawnSync(process.execPath, ['server/init-db.mjs'], options);
  assert.notEqual(second.status, 0);
  assert.match(second.stderr, /Refusing to replace or modify/);
});
