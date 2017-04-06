import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, ButtonGroup, DropdownButton, MenuItem, Alert, Row, Col, ListGroup, Badge, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <h1>Dashboard</h1>
        <Row>
          <Col sm={6}>
            <p><Button bsStyle="success">Default</Button></p>
            <div>
              <ButtonGroup>
                <Button>1</Button>
                <Button>2</Button>
                <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                  <MenuItem eventKey="1">Dropdown link</MenuItem>
                  <MenuItem eventKey="2">Dropdown link</MenuItem>
                </DropdownButton>
              </ButtonGroup>
            </div>
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
          <Col sm={6} />
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
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
