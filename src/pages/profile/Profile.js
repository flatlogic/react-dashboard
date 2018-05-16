import React, {PureComponent} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import Widget from '../../components/Widget';

import s from './Profile.scss';

class Profile extends PureComponent {
  onSubmit(e) { // eslint-disable-line
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Profile</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Profile</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <h5>
                  Edit Profile <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input size="lg" type="text" name="name" id="input-name"/>
                </FormGroup>
                <FormGroup>
                  <Label for="input-email">Email</Label>
                  <Input size="lg" type="email" name="email" id="input-email"/>
                </FormGroup>
                <FormGroup>
                  <Label for="input-password">Password</Label>
                  <Input size="lg" type="password" name="password" id="input-password"/>
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <div className="abc-checkbox">
                      <Input id="input-checkbox" type="checkbox" />
                      <Label for="input-checkbox" />
                    </div>
                    <span>Remember me</span>
                  </div>
                  <ButtonGroup className="pull-right">
                    <Button className="ml-sm" color="default">Cancel</Button>
                    <Button color="danger">Save</Button>
                  </ButtonGroup>
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withStyles(s)(Profile);
