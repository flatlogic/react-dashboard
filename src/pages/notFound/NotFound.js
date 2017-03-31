/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.scss';

class NotFound extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>404</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
