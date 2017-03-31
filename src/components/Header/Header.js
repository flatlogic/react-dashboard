/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Navbar, MenuItem, Nav, NavDropdown, NavItem, Glyphicon, Badge } from 'react-bootstrap';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    sidebarToggle: React.PropTypes.func,
  };

  static defaultProps = {
    sidebarToggle: () => {},
  };

  render() {
    return (
      <Navbar fluid>
        <Nav pullLeft>
          <NavItem className={['visible-xs', s.menuButton].join(' ')} eventKey={1} href="#" onClick={this.props.sidebarToggle}>
            <Glyphicon glyph="menu-hamburger" />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown
            eventKey={1} title={
              <span>
                <Glyphicon glyph="user" className="mr-sm" />
            John <span className="fw-semi-bold">Willington</span>
                <Badge className="ml-sm badge-warning">4</Badge>
              </span>
          } noCaret id="basic-nav-dropdown"
          >
            <MenuItem eventKey={3.1}>Notifications</MenuItem>
            <MenuItem eventKey={3.2}>Action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
          <NavItem eventKey={2} href="/login">Logout</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    init: state.runtime.initialNow,
  };
}
export default connect(mapStateToProps)(withStyles(s)(Header));
