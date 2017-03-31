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
import s from './Widget.scss';

class Widget extends React.Component {
  static propTypes = {
    title: React.PropTypes.node.isRequired,
  };

  render() {
    return (
      <section className={s.widget}>
        <h5 className={s.title}>{this.props.title}</h5>
        <div>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default withStyles(s)(Widget);
