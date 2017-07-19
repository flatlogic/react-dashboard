import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import withMeta from '../../../core/withMeta';
import Widget from '../../../components/Widget';
import s from './PostNew.scss';
import { createPost } from '../../../actions/posts';

class PostNew extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
  };

  static meta = {
    title: 'Create new post',
    description: 'About description',
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
    };
  }

  changeTitle(event) {
    this.setState({ title: event.target.value });
  }

  changeContent(event) {
    this.setState({ content: event.target.value });
  }

  doCreatePost(e) {
    this.props
      .dispatch(
        createPost({ title: this.state.title, content: this.state.content }),
      )
      .then(() => this.setState({ title: '', content: '' }));
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li>
            <span className="text-muted">YOU ARE HERE</span>
          </li>
          <li className="active">New Post</li>
        </ol>
        <h1>Create new post</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <span>
                  Add Post <span className="fw-semi-bold">Form</span>
                </span>
              }
            >
              <Form horizontal onSubmit={this.doCreatePost.bind(this)}>
                {this.props.message &&
                  <Alert className="alert-sm" bsStyle="info">
                    {this.props.message}
                  </Alert>}
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Title
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="text"
                      placeholder="Title"
                      value={this.state.title}
                      required
                      onChange={this.changeTitle.bind(this)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Content
                  </Col>
                  <Col sm={10}>
                    <textarea
                      className="form-control"
                      placeholder="Post Content"
                      value={this.state.content}
                      required
                      onChange={this.changeContent.bind(this)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <div className="btn-toolbar pull-right">
                      <Button>Cancel</Button>
                      <Button bsStyle="danger" type="submit">
                        {this.props.isFetching ? 'Creating...' : 'Create'}
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
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    message: state.posts.message,
  };
}

export default connect(mapStateToProps)(withStyles(s)(withMeta(PostNew)));
