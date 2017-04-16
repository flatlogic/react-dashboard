/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';

import Bundle from '../core/Bundle';

/* eslint-disable */
import loadLogin from 'bundle-loader?lazy!../pages/login/Login';
import loadRegister from 'bundle-loader?lazy!../pages/register/Register';
import loadNotFound from 'bundle-loader?lazy!../pages/notFound/NotFound';
/* eslint-enable */

import LayoutComponent from '../components/Layout/Layout';


// import { auth } from '../config';

const LoginBundle = Bundle.generateBundle(loadLogin);
const RegisterBundle = Bundle.generateBundle(loadRegister);
const NotFoundBundle = Bundle.generateBundle(loadNotFound);


const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

// let isAuthenticated = function() {
//   let t = jwt.verify(cookie.load('id_token'), auth.jwt.secret);
//
//   console.log(t);
//
//   return true;
// };


const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest} render={props => (
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  )}
  />
);

class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType),
    store: PropTypes.any,
  };

  static defaultProps = {
    context: null,
  };


  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    // fixme. Temporary solution until redux is integrated
    return this.props.context || this.context.router.staticContext;
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/app" />} />
        <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/app" component={LayoutComponent} />
        <Route path="/login" exact component={LoginBundle} />
        <Route path="/register" exact component={RegisterBundle} />
        <Route component={NotFoundBundle} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.user.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(App));
