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
import { Link } from 'react-router-dom';
import s from './Footer.scss';

const Footer = (props) => (
  <footer className={[s.root, props.className].join(' ')}>
    <div className={s.container}>
      <span>© 2017 &nbsp; Your Company </span>
      <span className={s.spacer}>·</span>
      <Link to="/admin">Terms of Service</Link>
      <span className={s.spacer}>·</span>
      <Link to="/privacy">Privacy Policy</Link>
      <span className={s.spacer}>·</span>
      <Link to="/not-found">Support</Link>
    </div>
  </footer>
);

export default withStyles(s)(Footer);
