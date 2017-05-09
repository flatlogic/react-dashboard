import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

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

  doLogin(e) {
    this.props
      .dispatch(loginUser({ login: this.state.login, password: this.state.password }));
    e.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } };

    if (this.props.isAuthenticated) { // cant access login page while logged in
      return (
        <Redirect to={from}/>
      );
    }

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
                <form className="mt" onSubmit={this.doLogin.bind(this)}>
                  {
                    this.props.errorMessage && (
                      <Alert className="alert-sm" bsStyle="danger">
                        {this.props.errorMessage}
                      </Alert>
                    )
                  }
                  <div className="form-group">
                    <input className="form-control no-border" value={this.state.login} onChange={this.changeLogin.bind(this)} type="text" required name="username" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input className="form-control no-border" value={this.state.password} onChange={this.changePassword.bind(this)} type="password" required name="password" placeholder="Password" />
                  </div>
                  <div className="clearfix">
                    <div className="btn-toolbar pull-right">
                      <button type="reset" className="btn btn-default btn-sm">Create an account</button>
                      <button type="submit" className="btn btn-success btn-sm">{this.props.isFetching ? 'Loading...' : 'Login'}</button>
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
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Login)));
