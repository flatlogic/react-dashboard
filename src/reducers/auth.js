import {
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from '../actions/user';

const authenticated = localStorage.getItem('authenticated');

export default function auth(state = {
  isFetching: false,
  isAuthenticated: authenticated,
}, action) {
  switch (action.type) {
      case LOGIN_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              errorMessage: '',
          });
      case LOGIN_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              errorMessage: action.payload,
          });
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, {
              isAuthenticated: false,
          });
      default:
          return state;
  }
}
