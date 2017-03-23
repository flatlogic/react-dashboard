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
import s from './Contact.scss';
import withMeta from '../../core/withMeta';

const Contact = () => (
  <div className={s.root}>
    <div className={s.container}>
      <h1>Contactssss11</h1>
      <p>...</p>
    </div>
  </div>
);

export default withStyles(s)(withMeta(Contact));
