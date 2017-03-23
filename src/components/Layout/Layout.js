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

/* eslint-disable */
import loadContact from 'bundle-loader?lazy!../../routes/contact/Contact';
import loadHome from 'bundle-loader?lazy!../../routes/home/Home';
import loadAbout from 'bundle-loader?lazy!../../routes/about/About';
import loadPrivacy from 'bundle-loader?lazy!../../routes/privacy/Privacy';
import loadAdmin from 'bundle-loader?lazy!../../routes/admin/Admin';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import Bundle from '../../core/Bundle';
import Sidebar from '../Sidebar';

const ContactBundle = Bundle.generateBundle(loadContact);
const HomeBundle = Bundle.generateBundle(loadHome);
const AboutBundle = Bundle.generateBundle(loadAbout);
const PrivacyBundle = Bundle.generateBundle(loadPrivacy);
const AdminBundle = Bundle.generateBundle(loadAdmin);

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className={s['app-body']}>
          <Header />
          <Switch>
            <Route path="/layout" exact component={HomeBundle} />
            <Route path="/layout/contact" exact component={ContactBundle} />
            <Route path="/layout/about" exact component={AboutBundle} />
            <Route path="/layout/privacy" exact component={PrivacyBundle} />
            <Route path="/layout/admin" exact component={AdminBundle} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(s)(Layout));
