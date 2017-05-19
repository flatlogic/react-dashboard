import {
  CREATE_POST_INITIAL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE
} from '../actions/posts';

export default function posts(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case CREATE_POST_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null
      });
    case CREATE_POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Post created successfully',
      });
    case CREATE_POST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Due to security reasons posts creation is closed in demo version. Please set up locally to test',
      });
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      });
    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Something wrong happened. Please come back later'
      });
    default:
      return state;
  }
}
