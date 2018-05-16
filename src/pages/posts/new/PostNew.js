import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Alert,
  Label,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import {connect} from 'react-redux';

import withMeta from '../../../core/withMeta';
import Widget from '../../../components/Widget';

import {createPost} from '../../../actions/posts';
import s from './PostNew.scss';

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

  changeTitle = (event) => {
    this.setState({title: event.target.value});
  }

  changeContent = (event) => {
    this.setState({content: event.target.value});
  }

  doCreatePost = (e) => {
    this.props
      .dispatch(
        createPost({
          title: this.state.title,
          content: this.state.content,
        }),
      )
      .then(() =>
        this.setState({
          title: '',
          content: '',
        }),
      );
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
         <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>New Post</BreadcrumbItem>
        </Breadcrumb>
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
              <Form onSubmit={this.doCreatePost}>
                {this.props.message && (
                  <Alert className="alert-sm" bsStyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-title">Title</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    required
                    onChange={this.changeTitle}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Content</Label>
                  <textarea
                    id="input-content"
                    className="form-control"
                    placeholder="Post Content"
                    value={this.state.content}
                    required
                    onChange={this.changeContent}
                  />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="default">Cancel</Button>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Creating...' : 'Create'}
                    </Button>
                  </ButtonGroup>
                </div>
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
