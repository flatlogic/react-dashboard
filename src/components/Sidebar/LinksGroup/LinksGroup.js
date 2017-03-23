import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavLink } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import s from './LinksGroup.scss';

class LinksGroup extends Component {
  /* eslint-disable */
  static propTypes = {
    header: PropTypes.string.isRequired,
    headerLink: PropTypes.string,
    childrenLinks: PropTypes.array,
    iconName: PropTypes.string.isRequired,
  };
  /* eslint-enable */

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };
  }

  render() {
    if (this.props.headerLink) {
      return (
        <li className={s.headerLink}>
          <NavLink to={this.props.headerLink} activeClassName={s.headerLinkActive}>
            <i className={`glyphicon ${this.props.iconName} mr-xs`} />
            {this.props.header}
          </NavLink>
        </li>
      );
    }

    return (
      <li className={s.headerLink}>
        {/* eslint-disable */}
        <a onClick={() => { this.setState({ isOpened: !this.state.isOpened }); }}>
          <i className={`glyphicon ${this.props.iconName} mr-xs`} />

          {this.props.header}

          <b className={['caret', s.caret].join(' ')} />
        </a>
        {/* eslint-disable */}
        <Panel className={s.panel} collapsible expanded={this.state.isOpened}>
          <ul>
            {this.props.childrenLinks && this.props.childrenLinks.map(child => (
              <li key={child.name}>
                <NavLink
                  to={child.link}
                  onClick={() => this.setState({ isOpened: false })}
                  activeClassName={s.headerLinkActive}
                >
                  {child.name}
                </NavLink>
              </li>
              ))}
          </ul>
        </Panel>
      </li>
    );
  }

}

export default withStyles(s)(LinksGroup);
