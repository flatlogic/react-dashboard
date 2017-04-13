/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import Widget from '../../components/Widget';
import Footer from '../../components/Footer';
import s from './Login.scss'; // eslint-disable-line
import { loginUser } from '../../actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  changeLogin(event) {
    this.setState({ login: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin() {
    this.props.dispatch(loginUser({ login: this.state.login, password: this.state.password }));
  }

  render() {
    return (
      <div className={s.root}>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} lg={4} lgOffset={4}>
              <p className="text-center">React Dashboard</p>
              <Widget className={s.widget}>
                <h4 className="mt-0">Login to your Web App</h4>
                <p className="fs-sm text-muted">
                  User your username and password to sign in<br />
                  Don&#39;t have an account? Sign up now!
                </p>
                <form className="mt" onSubmit={() => this.doLogin()}>
                  <div className="form-group">
                    <input className="form-control no-border" value={this.state.login} onChange={this.changeLogin.bind(this)} type="text" required="" name="username" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input className="form-control no-border" value={this.state.password} onChange={this.changePassword.bind(this)} type="text" required="" name="password" placeholder="Password" />
                  </div>
                  <div className="clearfix">
                    <div className="btn-toolbar pull-right">
                      <button type="reset" className="btn btn-default btn-sm">Create an account</button>
                      <button type="submit" className="btn btn-success btn-sm">{this.props.isFetching ? 'Loading' : 'Login'}</button>
                    </div>
                    <a className="mt-sm pull-right fs-sm">Trouble with account?</a>
                  </div>
                </form>
              </Widget>
            </Col>
          </Row>
        </Grid>
        <Footer className="text-center" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching,
  };
}

export default connect(mapStateToProps)(withStyles(s)(Login));
