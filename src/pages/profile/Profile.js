import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';

import Widget from '../../components/Widget';

import s from './Profile.scss';

const Profile = () => (
  <div className={s.root}>
    <ol className="breadcrumb">
      <li><span className="text-muted">YOU ARE HERE</span></li>
      <li className="active">Profile</li>
    </ol>
    <h1>Profile</h1>
    <Row>
      <Col sm={6}>
        <Widget title={
        <span>
          Edit Profile <span className="fw-semi-bold">Form</span>
        </span>
        }>
          Some fields to edit profile
        </Widget>
      </Col>
    </Row>
  </div>
);

export default withStyles(s)(Profile);
