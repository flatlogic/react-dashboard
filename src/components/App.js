/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import { connect, Provider as ReduxProvider } from 'react-redux';

import Bundle from '../core/Bundle';

/* eslint-disable */
import loadRegister from 'bundle-loader?lazy!../pages/register/Register';
import loadNotFound from 'bundle-loader?lazy!../pages/notFound/NotFound';
/* eslint-enable */

import LayoutComponent from '../components/Layout/Layout';
import LoginComponent from '../pages/login/Login';

// import { auth } from '../config';

const RegisterBundle = Bundle.generateBundle(loadRegister);
const NotFoundBundle = Bundle.generateBundle(loadNotFound);

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

/* eslint-disable */
const PrivateRoute = ({ component, isAuthenticated, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? React.createElement(component, props)
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />}
  />;
/* eslint-enable */

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType),
    isAuthenticated: PropTypes.bool,
  };

  static defaultProps = {
    context: null,
    isAuthenticated: false,
  };

  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    // fixme. find better solution?
    return this.props.context || this.context.router.staticContext;
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/app" />} />
        <PrivateRoute
          isAuthenticated={this.props.isAuthenticated}
          path="/app"
          component={LayoutComponent}
        />
        <Route path="/login" exact component={LoginComponent} />
        <Route path="/register" exact component={RegisterBundle} />
        <Route component={NotFoundBundle} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(App));
