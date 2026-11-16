import React from 'react';
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget';

const Register = () => (
  <div className="container-fluid py-5">
    <div className="row justify-content-center">
      <div className="col-xl-5 col-lg-6">
        <Widget title="Demo account">
          <p className="mb-3">
            Registration is unavailable in this demo. Sign in with the username
            <strong> user</strong> and password <strong>password</strong>.
          </p>
          <p className="mb-4">
            All visitors use the same demo account.
          </p>
          <Link className="btn btn-danger" to="/login">
            Back to login
          </Link>
        </Widget>
      </div>
    </div>
  </div>
);

export default Register;
