import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, ProgressBar,
  Alert, Row, Col, ListGroup, Badge, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget';

import s from './Dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert1Visible: true,
      alert2Visible: true,
      alert3Visible: true,
      alert4Visible: true,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li><span className="text-muted">YOU ARE HERE</span></li>
          <li className="active">Dashboard</li>
        </ol>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={6}>
            <Widget title={
              <div>
                <div className="pull-right mt-n-xs">
                  <input type="search" placeholder="Search..." className="form-control input-sm" />
                </div>
                <h5 className="mt-0"><Glyphicon glyph="user" className="mr-xs opacity-70"/> Users</h5>
              </div>
            }>
              <table className="table mb-0">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Alice</td>
                  <td>alice@email.com</td>
                  <td><span className="label label-success">active</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Bob</td>
                  <td>bob@email.com</td>
                  <td><span className="label label-warning text-default">delayed</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Duck</td>
                  <td>duck@email.com</td>
                  <td><span className="label label-success">active</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Shepherd</td>
                  <td>shepherd@email.com</td>
                  <td><span className="label bg-dark">removed</span></td>
                </tr>
                </tbody>
              </table>
            </Widget>
          </Col>
          <Col sm={6}>
            { this.state.alert1Visible &&
              <Alert className="alert-sm" bsStyle="warning" onDismiss={() => this.setState({ alert1Visible: false })}>
                <span className="fw-semi-bold">Warning:</span> Best check yo self, you&#39;re not looking too good.
              </Alert>
            }
            { this.state.alert2Visible &&
            <Alert className="alert-sm" bsStyle="success" onDismiss={() => this.setState({ alert2Visible: false })}>
              <span className="fw-semi-bold">Success:</span> You successfully read this important alert message.
            </Alert>
            }
            { this.state.alert3Visible &&
            <Alert className="alert-sm" bsStyle="info" onDismiss={() => this.setState({ alert3Visible: false })}>
              <span className="fw-semi-bold">Info:</span> This alert needs your attention, but it&#39;s not super important.
            </Alert>
            }
            { this.state.alert4Visible &&
            <Alert className="alert-sm" bsStyle="danger" onDismiss={() => this.setState({ alert4Visible: false })}>
              <span className="fw-semi-bold">Danger:</span> Change this and that and try again.
              <span className="pull-right">
                <Button bsStyle="danger" bsSize="xsmall">Take this action</Button>
                <span> or </span>
                <Button bsSize="xsmall">Cancel</Button>
              </span>
            </Alert>
            }
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Widget title={
              <div>
                <div className="pull-right mt-n-xs">
                  <a className="td-underline fs-sm">Options</a>
                </div>
                <h5 className="mt-0 mb-0">Recent posts <Badge bsStyle="success" className="ml-xs">5</Badge></h5>
                <p className="fs-sm mb-0 text-muted">posts, that have been published recently</p>
              </div>
            }>
              Posts list
            </Widget>
          </Col>
          <Col sm={6}>
            <ListGroup>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="phone" className="mr-xs opacity-70"/> Incoming calls <Badge bsStyle="danger">3</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="bell" className="mr-xs opacity-70"/> Notifications <Badge bsStyle="warning">6</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="comment" className="mr-xs opacity-70"/> Messages <Badge bsStyle="success">18</Badge></Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="eye-open" className="mr-xs opacity-70"/> Visits total</Link>
              <Link to="/app" className="list-group-item"><Glyphicon glyph="cloud" className="mr-xs opacity-70"/> Inbox <Glyphicon glyph="chevron-right" className="opacity-70 pull-right"/></Link>
            </ListGroup>
          </Col>
        </Row>
        <h3 className="mb">Some standard react-bootstrap components</h3>
          <Row className="mb">
            <Col sm={6}>
              <ButtonToolbar className="mb">
                <Button bsSize="small">Default</Button>
                <Button bsSize="small" bsStyle="success">Success</Button>
                <Button bsSize="small" bsStyle="info">Info</Button>
                <Button bsSize="small" bsStyle="warning">Warning</Button>
                <Button bsSize="small" bsStyle="inverse">Inverse</Button>
              </ButtonToolbar>
              <ButtonGroup className="mb">
                <Button>1</Button>
                <Button>2</Button>
                <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                  <MenuItem eventKey="1">Dropdown link</MenuItem>
                  <MenuItem eventKey="2">Dropdown link</MenuItem>
                </DropdownButton>
              </ButtonGroup>
              <p>For more components please checkout <a href="https://react-bootstrap.github.io/components.html"
                                                         target="_blank">react-bootstrap documentation</a></p>
            </Col>
            <Col sm={6}>
              <ProgressBar className="progress-sm" bsStyle="success" now={40} />
              <ProgressBar className="progress-sm" bsStyle="info" now={20} />
              <ProgressBar className="progress-sm" bsStyle="warning" now={60} />
              <ProgressBar className="progress-sm" bsStyle="danger" now={80} />
            </Col>
          </Row>
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
