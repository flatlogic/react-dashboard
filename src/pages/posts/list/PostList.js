import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { mock } from './mock'

import s from './PostList.module.scss';
import Widget from '../../../components/Widget';
import { fetchPosts } from '../../../actions/posts';

class PostList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array, // eslint-disable-line
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    posts: [],
  };

  static meta = {
    title: 'Posts list',
    description: 'About description',
  };

  componentDidMount() {
    if(process.env.NODE_ENV === "development") {
      this.props.dispatch(fetchPosts());      
    }
  }

  formatDate = (str) => {
    return str.replace(/,.*$/,"")
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Posts</BreadcrumbItem>
        </Breadcrumb>
        <h1>Posts</h1>
        <Widget
          className="pb-0"
          title={
            <div>
              <div className="pull-right mt-n-xs">
                <Link to="/app/posts/new" className="btn btn-sm btn-inverse">
                  Create new
                </Link>
              </div>
              <h5 className="mt-0">
                Posts <span className="fw-semi-bold">List</span>
              </h5>
            </div>
          }
        >
          <div className="widget-table-overflow">
            <Table striped>
              <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Last Updated</th>
              </tr>
              </thead>
              <tbody>
              {this.props.posts &&
              this.props.posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.content.slice(0, 80)}...</td>
                  <td>{this.formatDate(new Date(post.updatedAt).toLocaleString())}</td>
                </tr>
              ))}
              {this.props.posts &&
              !this.props.posts.length && (
                mock.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.content.slice(0, 80)}...</td>
                    <td>{post.updatedAt}</td>
                  </tr>
                ))
              )}
              {this.props.isFetching && (
                <tr>
                  <td colSpan="100">Loading...</td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </Widget>
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

export default connect(mapStateToProps)(PostList);
