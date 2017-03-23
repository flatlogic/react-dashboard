import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Sidebar.scss';
import LinksGroup from './LinksGroup/LinksGroup';

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <a>React Dashboard</a>
    </header>

    <ul className={s.nav}>
      <LinksGroup header="Dashboard" headerLink="/app" iconName="glyphicon-tree-conifer" />
      <LinksGroup
        header="Posts"
        childrenLinks={[{ name: 'Show all', link: '/app/posts' }, { name: 'Create new', link: '/app/posts/new' }]}
        iconName="glyphicon-list-alt"
      />
      <LinksGroup header="Profile" headerLink="/app/profile" iconName="glyphicon-user" />
    </ul>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default connect(mapStateToProps)(withStyles(s)(Sidebar));
