/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Grid} from 'react-bootstrap';

import Widget from '../../components/Widget';
import Footer from '../../components/Footer';
import s from './Login.scss';

class Login extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} lg={4} smOffset={4}>
              <p className='text-center'>React Dashboard</p>
              <Widget className={s.widget}>
                <h4 className="mt-0">Login to your Web App</h4>
                <p className="fs-sm text-muted">
                  User your username and password to sign in<br/>
                  Don't have an account? Sign up now!
                </p>
                <form className="mt">
                  <div className="form-group">
                    <input className="form-control no-border" type="text" required="" name="username" placeholder="Username"/>
                  </div>
                  <div className="form-group">
                    <input className="form-control no-border" type="text" required="" name="password" placeholder="Password"/>
                  </div>
                  <div className="clearfix">
                    <div className="btn-toolbar pull-right">
                      <button type="reset" className="btn btn-default btn-sm">Create an account</button>
                      <button type="submit" className="btn btn-success btn-sm">Login</button>
                    </div>
                    <a className="mt-sm pull-right fs-sm" href="#">Trouble with account?</a>
                  </div>
                </form>
              </Widget>
            </Col>
          </Row>
        </Grid>
        <Footer className="text-center"/>
      </div>
    );
  }
}

export default withStyles(s)(Login);
