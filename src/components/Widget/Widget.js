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
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Widget.scss';

class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
  };

  render() {
    return (
      <section className={cx(s.widget, this.props.className)}>
        {this.props.title &&
        (typeof this.props.title === 'string' ? (
          <h5 className={s.title}>{this.props.title}</h5>
        ) : (
          <header className={s.title}>{this.props.title}</header>
        ))}
        <div>{this.props.children}</div>
      </section>
    );
  }
}

export default withStyles(s)(Widget);
