/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import { StaticRouter } from 'react-router';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './pages/error/ErrorPage';
import errorPageStyle from './pages/error/ErrorPage.scss';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { port, auth } from './config';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import theme from './styles/theme.scss';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));

if (__DEV__) {
  app.enable('trust proxy');
}
app.post('/login', (req, res) => {
  // console.log(req.body);

  // var user = graphql.find(req.username, req.userpassword);

  const user = { username: 'D', userpassword: '123' };

  if (user) {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/app');
  } else {
    res.redirect('/404'); // user not found
  }
});

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*',
  // expressJwt({secret: auth.jwt.secret}),
   async (req, res, next) => {
     // let t = jwt.verify(, auth.jwt.secret);

     console.log(cookie.load('id_token'));

     try {
       const store = configureStore({
         user: req.user || null,
       }, {
         cookie: req.headers.cookie,
       });

       store.dispatch(setRuntimeVariable({
         name: 'initialNow',
         value: Date.now(),
       }));

       const css = new Set();

       const data = {
         title: 'React Dashboard',
         description: 'React Dashboard Starter project based on react-router 4, redux, graphql, bootstrap',
       };

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
       const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
         insertCss: (...styles) => {
          // eslint-disable-next-line no-underscore-dangle
           styles.forEach(style => css.add(style._getCss()));
         },
        // Initialize a new Redux store
        // http://redux.js.org/docs/basics/UsageWithReact.html
         store,
       };

      // eslint-disable-next-line no-underscore-dangle
       css.add(theme._getCss());

       data.scripts = [
         assets.vendor.js,
         assets.client.js,
       ];

       data.state = context.store.getState();
       console.log('store', store);

       const html = ReactDOM.renderToString(
         <StaticRouter
           location={req.url}
           context={context}
         >
           <Provider store={store}>
             <App store={store} />
           </Provider>
         </StaticRouter>,
      );

       data.styles = [
        { id: 'css', cssText: [...css].join('') },
       ];

       data.children = html;

       const markup = ReactDOM.renderToString(
         <Html {...data} />,
      );

       res.status(200);
       res.send(`<!doctype html>${markup}`);
     } catch (err) {
       next(err);
     }
   });

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
