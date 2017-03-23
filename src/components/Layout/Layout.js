/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadPosts from 'bundle-loader?lazy!../../pages/posts/Posts';
import loadPrivacy from 'bundle-loader?lazy!../../pages/privacy/Privacy';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import Bundle from '../../core/Bundle';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

const PostsBundle = Bundle.generateBundle(loadPosts);
const PrivacyBundle = Bundle.generateBundle(loadPrivacy);

const Layout = () => (
  <div className={s.root}>
    <Sidebar />
    <div className={s.wrap}>
      <Header />
      <main className={s.content}>
        <Switch>
          <Route path="/app" exact component={Dashboard} />
          <Route path="/app/posts" exact component={PostsBundle} />
          <Route path="/app/privacy" exact component={PrivacyBundle} />
        </Switch>
      </main>
      <Footer />
    </div>
  </div>
);

export default withRouter(withStyles(s)(Layout));
