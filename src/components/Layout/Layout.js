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
import { Switch, Route } from 'react-router';

/* eslint-disable */
import loadContact from 'bundle-loader?lazy!../../routes/contact/Contact';
import loadHome from 'bundle-loader?lazy!../../routes/home/Home';
import loadNotFound from 'bundle-loader?lazy!../../routes/notFound/NotFound';
import loadAbout from 'bundle-loader?lazy!../../routes/about/About';
import loadLogin from 'bundle-loader?lazy!../../routes/login/Login';
import loadRegister from 'bundle-loader?lazy!../../routes/register/Register';
import loadPrivacy from 'bundle-loader?lazy!../../routes/privacy/Privacy';
import loadAdmin from 'bundle-loader?lazy!../../routes/admin/Admin';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import Bundle from '../../core/Bundle';


const ContactBundle = Bundle.generateBundle(loadContact);
const HomeBundle = Bundle.generateBundle(loadHome);
const NotFoundBundle = Bundle.generateBundle(loadNotFound);
const AboutBundle = Bundle.generateBundle(loadAbout);
const LoginBundle = Bundle.generateBundle(loadLogin);
const RegisterBundle = Bundle.generateBundle(loadRegister);
const PrivacyBundle = Bundle.generateBundle(loadPrivacy);
const AdminBundle = Bundle.generateBundle(loadAdmin);

const Layout = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/" exact component={HomeBundle} />
      <Route path="/contact" exact component={ContactBundle} />
      <Route path="/about" exact component={AboutBundle} />
      <Route path="/login" exact component={LoginBundle} />
      <Route path="/register" exact component={RegisterBundle} />
      <Route path="/privacy" exact component={PrivacyBundle} />
      <Route path="/admin" exact component={AdminBundle} />
      <Route component={NotFoundBundle} />
    </Switch>
    <Feedback />
    <Footer />
  </div>
);
export default withStyles(s)(Layout);
