import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Profile.scss';

const Profile = () => (
  <div className={s.root}>
    <ol className="breadcrumb">
      <li><span className="text-muted">YOU ARE HERE</span></li>
      <li className="active">Profile</li>
    </ol>
    <h1>Profile</h1>
  </div>
);

export default withStyles(s)(Profile);
