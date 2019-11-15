/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
// import loadPosts from 'bundle-loader?lazy!../../pages/posts';
// import loadPrivacy from 'bundle-loader?lazy!../../pages/privacy';
// import loadProfile from 'bundle-loader?lazy!../../pages/profile';
// import loadTypography from 'bundle-loader?lazy!../../pages/typography';
// import loadTables from 'bundle-loader?lazy!../../pages/tables';
// import loadButtons from 'bundle-loader?lazy!../../pages/buttons';
// import loadNotifications from 'bundle-loader?lazy!../../pages/notifications';
// import loadCharts from 'bundle-loader?lazy!../../pages/charts';
// import loadIcons from 'bundle-loader?lazy!../../pages/icons';
// import loadMaps from 'bundle-loader?lazy!../../pages/google';
// import loadNotFound from 'bundle-loader?lazy!../../pages/notFound';
/* eslint-enable */

import s from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
//import Bundle from '../../core/Bundle';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard'
import Buttons from '../../pages/buttons'
import Charts from '../../pages/charts'
import Maps from '../../pages/google'
import NotFound from '../../pages/notFound'
import Icons from '../../pages/icons'
import Typography from '../../pages/typography'
import Tables from '../../pages/tables'
import Notifications from '../../pages/notifications'
import Posts from '../../pages/posts'
import Profile from '../../pages/profile'
import Privacy from '../../pages/privacy'
// const PostsBundle = Bundle.generateBundle(loadPosts);
// const PrivacyBundle = Bundle.generateBundle(loadPrivacy);
// const ProfileBundle = Bundle.generateBundle(loadProfile);
// const TypographyBundle = Bundle.generateBundle(loadTypography);
// const TablesBundle = Bundle.generateBundle(loadTables);
// const ButtonsBundle = Bundle.generateBundle(loadButtons);
// const NotificationsBundle = Bundle.generateBundle(loadNotifications);
// const ChartsBundle = Bundle.generateBundle(loadCharts);
// const IconsBundle = Bundle.generateBundle(loadIcons);
// const MapsBundle = Bundle.generateBundle(loadMaps);
// const NotFoundBundle = Bundle.generateBundle(loadNotFound);

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, {[s.sidebarOpen]: this.state.sidebarOpen})}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path="/app/main" exact component={Dashboard} />
              <Route path="/app/typography" exact component={Typography} />
              <Route path="/app/tables" exact component={Tables} />
              <Route path="/app/posts" component={Posts} />
              <Route path="/app/privacy" exact component={Privacy} />
              <Route path="/app/profile" exact component={Profile} />
              <Route path="/app/notifications" exact component={Notifications} /> 
              <Route path="/app/components/buttons" exact component={Buttons} />
              <Route path="/app/components/charts" exact component={Charts} />
              <Route path="/app/components/icons" exact component={Icons} />
              <Route path="/app/components/maps" exact component={Maps} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
