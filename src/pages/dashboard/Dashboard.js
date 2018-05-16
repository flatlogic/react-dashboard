import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {  
  Row,
  Col,
  Alert, 
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table
} from 'reactstrap';


import Widget from '../../components/Widget';

import { fetchPosts } from '../../actions/posts';
import s from './Dashboard.scss';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentWillMount() {
    this.props.dispatch(fetchPosts());
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <div>
                  <div className="pull-right mt-n-xs">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="form-control input-sm"
                    />
                  </div>
                  <h5 className="mt-0 mb-3">
                    <i className="fa fa-user mr-xs opacity-70" />{' '}
                    Users
                  </h5>
                </div>
              }
            >
              <Table responsive className="mb-0">
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
                  <td>
                    <span className="py-0 px-1 bg-success rounded text-white">active</span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Bob</td>
                  <td>bob@email.com</td>
                  <td>
                    <span className="py-0 px-1 bg-warning rounded text-white">delayed</span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Duck</td>
                  <td>duck@email.com</td>
                  <td>
                    <span className="py-0 px-1 bg-success rounded text-white">active</span>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Shepherd</td>
                  <td>shepherd@email.com</td>
                  <td>
                    <span className="py-0 px-1 bg-danger rounded text-white">removed</span>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Alert
              className="alert-sm"
              color="warning"
            >
              <span className="fw-semi-bold">Warning:</span> Best check yo
              self, you&#39;re not looking too good.
            </Alert>
            <Alert
              className="alert-sm"
              color="success"
            >
              <span className="fw-semi-bold">Success:</span> You successfully
              read this important alert message.
            </Alert>
            <Alert
              className="alert-sm"
              color="info"
            >
              <span className="fw-semi-bold">Info:</span> This alert needs
              your attention, but it&#39;s not super important.
            </Alert>
            <Alert
              className="alert-sm clearfix"
              color="danger"
            >
              <span className="fw-semi-bold">Danger:</span> Change this and
              that and try again.
              <span className="pull-right mr-sm">
                <Button color="danger" size="sm">
                  Take this action
                </Button>
                <span> or </span>
                <Button color="default" size="sm">Cancel</Button>
              </span>
          </Alert>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <div>
                  <div className="pull-right mt-n-xs">
                    {/* eslint-disable */}
                    <a href="#" className="td-underline fs-sm">
                      Options
                    </a>
                    {/* eslint-enable */}
                  </div>
                  <h5 className="mt-0 mb-0">
                    Recent posts{' '}
                    <Badge color="success" className="ml-xs">
                      5
                    </Badge>
                  </h5>
                  <p className="fs-sm mb-0 text-muted">
                    posts, that have been published recently
                  </p>
                </div>
              }
            >
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {this.props.posts &&
                this.props.posts.map(post => (
                  <tr key={post.id}>
                    <td>{new Date(post.updatedAt).toLocaleString()}</td>
                    <td>
                      <Link to="/app/posts">{post.title}</Link>
                    </td>
                  </tr>
                ))}
                {this.props.posts &&
                !this.props.posts.length && (
                  <tr>
                    <td colSpan="100">No posts yet</td>
                  </tr>
                )}
                {this.props.isFetching && (
                  <tr>
                    <td colSpan="100">Loading...</td>
                  </tr>
                )}
                </tbody>
              </table>
            </Widget>
          </Col>
          <Col sm={6}>
            <ListGroup>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-phone mr-xs opacity-70" />{' '}
                Incoming calls <Badge color="danger">3</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs opacity-70" />{' '}
                Notifications <Badge color="warning">6</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs opacity-70" />{' '}
                Messages <Badge color="success">18</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-eye mr-xs opacity-70" />{' '}
                Visits total
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-cloud mr-xs opacity-70" /> Inbox{' '}
              </Link>
            </ListGroup>
          </Col>
        </Row>
        <h3 className="mb">Some standard reactstrap components</h3>
        <Row className="mb">
          <Col sm={6}>
            <div>
              <Button size="sm" color="default" className="mr-sm mb-xs">
                Default
              </Button>
              <Button size="sm" color="success" className="mr-sm mb-xs">
                Success
              </Button>
              <Button size="sm" color="info" className="mr-sm mb-xs">
                Info
              </Button>
              <Button size="sm" color="warning" className="mr-sm mb-xs">
                Warning
              </Button>
              <Button size="sm" color="danger" className="mb-xs">
                Danger
              </Button>
            </div>
            <ButtonGroup className="mb">
              <Button color="default">1</Button>
              <Button color="default">2</Button>
              <ButtonDropdown isOpen={this.state.isDropdownOpened} toggle={this.toggleDropdown}>
                <DropdownToggle color="default" caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>1</DropdownItem>
                  <DropdownItem>2</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <p>
              For more components please checkout{' '}
              <a
                href="https://reactstrap.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                reactstrap documentation
              </a>
            </p>
          </Col>
          <Col sm={6}>
            <Progress className="progress-sm" color="success" value={40} />
            <Progress className="progress-sm" color="info" value={20} />
            <Progress className="progress-sm" color="warning" value={60} />
            <Progress className="progress-sm" color="danger" value={80} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(withStyles(s)(Dashboard));
