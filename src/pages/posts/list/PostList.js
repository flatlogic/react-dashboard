import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import s from './PostList.scss';
import withMeta from '../../../core/withMeta';
import Widget from '../../../components/Widget';
import { fetchPosts } from '../../../actions/posts';

class PostList extends React.Component {
  static meta = {
    title: 'Posts list',
    description: 'About description',
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li><span className="text-muted">YOU ARE HERE</span></li>
          <li className="active">Posts</li>
        </ol>
        <h1>Posts</h1>
        <Widget title={
              <div>
                <div className="pull-right mt-n-xs">
                  <Link to="/app/posts/new" className="btn btn-sm btn-inverse">Create new</Link>
                </div>
                <h5 className="mt-0 mb-0">Posts <span className="fw-semi-bold">List</span></h5>
              </div>
        }>
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Last Updated</th>
            </tr>
            </thead>
            <tbody>
            {this.props.posts && this.props.posts.map((post, index) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content.slice(0, 80)}...</td>
                <td>{new Date(post.updatedAt).toLocaleString() }</td>
              </tr>
            ))}
            {this.props.posts && !this.props.posts.length &&
              <tr>
                <td colSpan="100">No posts yet</td>
              </tr>
            }
            {this.props.isFetching &&
              <tr>
                <td colSpan="100">Loading</td>
              </tr>
            }
            </tbody>
          </table>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts
  };
}

export default connect(mapStateToProps)(withStyles(s)(withMeta(PostList)));
