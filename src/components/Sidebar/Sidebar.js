import React from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {ProgressBar} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';

import s from './Sidebar.scss';
import LinksGroup from './LinksGroup/LinksGroup';

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/app">React Dashboard</Link>
    </header>

    <ul className={s.nav}>
      <LinksGroup
        header="Dashboard"
        headerLink="/app"
        iconName="glyphicon-tree-conifer"
      />
      <LinksGroup
        header="Posts"
        headerLink="/app/posts"
        childrenLinks={[
          {
            name: 'Show all',
            link: '/app/posts',
          },
          {
            name: 'Create new',
            link: '/app/posts/new',
          },
        ]}
        iconName="glyphicon-list-alt"
      />
      <LinksGroup
        header={
          <span>
            Profile
            <sup className="text-warning fw-semi-bold">&nbsp;new</sup>
          </span>
        }
        headerLink="/app/profile"
        iconName="glyphicon-user"
      />
      <LinksGroup
        className="visible-xs"
        header="Logout"
        headerLink="/login"
        iconName="glyphicon-off"
      />
    </ul>
    <footer className={s.footer}>
      <p className="text-gray-lighter opacity-60 ml-xs mr-xs mb-xs">
        58% ready
      </p>
      <ProgressBar now={58} bsStyle="success" className="progress-xs mb-sm" />
    </footer>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));
