/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch, Route } from 'react-router';
import s from './Layout.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import Bundle from '../../core/Bundle';

import loadContact from 'bundle-loader?lazy!../../routes/contact/Contact'
import loadHome from 'bundle-loader?lazy!../../routes/home/Home';
import loadNotFound from 'bundle-loader?lazy!../../routes/notFound/NotFound';


const ContactBundle = Bundle.generateBundle(loadContact);
const HomeBundle = Bundle.generateBundle(loadHome);
const NotFoundBundle = Bundle.generateBundle(loadNotFound);

const Layout = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/" exact component={HomeBundle} />
      <Route path="/contact" exact component={ContactBundle} />
      <Route component={NotFoundBundle} />
    </Switch>
    <Feedback />
    <Footer />
  </div>
);
export default withStyles(s)(Layout);
