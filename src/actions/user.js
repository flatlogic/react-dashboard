import axios from 'axios';
import config from '../config';
import jwt from "jsonwebtoken";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        axios.defaults.headers.common['Authorization'] = "";
        dispatch(receiveLogout());
    };
}

export function receiveToken(token) {
    return (dispatch) => {
        let user;

        // We check if app runs with backend mode
        if (config.isBackend) {
          user = jwt.decode(token).user;
          delete user.id;
        } else {
          user = {
            email: config.auth.email
          }
        }

        delete user.id;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        dispatch(receiveLogin());
    }
}

export function loginUser(creds) {
    return (dispatch) => {
        // We check if app runs with backend mode
        if (!config.isBackend) {
          dispatch(receiveToken('token'));
        }

        else {
          dispatch(requestLogin());
          if (creds.social) {
            window.location.href = config.baseURLApi + "/user/signin/" + creds.social + (process.env.NODE_ENV === "production" ? "?app=light-blue-react" : "");
          } else if (creds.email.length > 0 && creds.password.length > 0) {
            axios.post("/user/signin/local", creds).then(res => {
              const token = res.data.token;
              dispatch(receiveToken(token));
            }).catch(err => {
              dispatch(loginError(err.response.data));
            })

          } else {
            dispatch(loginError('Something was wrong. Try again'));
          }
        }
    };
}
