import express from 'express'
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import schema from '../src/data/schema'
import dotenv from 'dotenv';
import config from './config';


const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

dotenv.config();
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);

app.post('/login', (req, res) => {
  // replace with real database check in production
  // const user = graphql.find(req.login, req.password);
  let user = false;
  const login = req.body.login; // eslint-disable-line
  const password = req.body.password; // eslint-disable-line
  if (login === 'user' && password === 'password') {
    user = { user, login };
  }

  if (user) {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, {
      maxAge: 1000 * expiresIn,
      httpOnly: false,
    });
    res.json({ id_token: token });
  } else {
    res.status(401).json({ message: 'To login use user: "user", password: "password".' });
  }
});

app.use(
  '/graphql',
  expressJwt({
    secret: config.auth.jwt.secret,
    getToken: req => req.cookies.id_token,
  }),
  expressGraphQL(req => ({
    schema,
    graphiql: process.env.REACT_APP_NODE_ENV,
    rootValue: { request: req },
    pretty: process.env.REACT_APP_NODE_ENV,
  })),
);

const PORT = process.env.REACT_APP_PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.REACT_APP_NODE_ENV} mode on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`)
  // Close server 
  server.close(() => process.exit(1))
})