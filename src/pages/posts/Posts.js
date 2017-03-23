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
import s from './Posts.scss';
import withMeta from '../../core/withMeta';

class Posts extends React.Component {
  static meta = {
    title: 'Posts list',
    description: 'About description',
  };

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li><span className="text-muted">YOU ARE HERE</span></li>
          <li className="active">Posts</li>
        </ol>
        <h1>Posts</h1>
        <p>...</p>
      </div>
    );
  }
}

export default withStyles(s)(withMeta(Posts));
