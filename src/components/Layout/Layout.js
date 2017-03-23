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
import loadContact from 'bundle-loader?lazy!../../pages/contact/Contact';
import loadAbout from 'bundle-loader?lazy!../../pages/about/About';
import loadPrivacy from 'bundle-loader?lazy!../../pages/privacy/Privacy';
import loadAdmin from 'bundle-loader?lazy!../../pages/admin/Admin';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import Bundle from '../../core/Bundle';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

const ContactBundle = Bundle.generateBundle(loadContact);
const AboutBundle = Bundle.generateBundle(loadAbout);
const PrivacyBundle = Bundle.generateBundle(loadPrivacy);
const AdminBundle = Bundle.generateBundle(loadAdmin);

class Layout extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <main className={s.content}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/contact" exact component={ContactBundle} />
              <Route path="/app/about" exact component={AboutBundle} />
              <Route path="/app/privacy" exact component={PrivacyBundle} />
              <Route path="/app/admin" exact component={AdminBundle} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(s)(Layout));
