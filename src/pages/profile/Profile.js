import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Form, FormGroup, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';

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
        <Widget
          title={
            <span>
          Edit Profile <span className="fw-semi-bold">Form</span>
            </span>
        }
        >
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Username" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <div className="btn-toolbar pull-right">
                  <Button>
                    Cancel
                  </Button>
                  <Button bsStyle="danger">
                    Save
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </Form>
        </Widget>
      </Col>
    </Row>
  </div>
);

export default withStyles(s)(Profile);
