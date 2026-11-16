import React, { startTransition, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../features/auth/authSlice';
import { backendEnabled } from '../../features/backend';
import Footer from '../../components/Footer';
import Widget from '../../components/Widget';
import s from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAppSelector((state) => state.auth.session);
  const status = useAppSelector((state) => state.auth.status);
  const errorMessage = useAppSelector((state) => state.auth.error);
  const [credentials, setCredentials] = useState({
    login: 'user',
    password: 'password',
  });

  const from = location.state?.from?.pathname || '/app/main';

  if (session) {
    return <Navigate replace to={from} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(loginUser(credentials));

    if (loginUser.fulfilled.match(result)) {
      startTransition(() => {
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <div className={s.root}>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} sm={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <p className="text-center">React Dashboard</p>
          <Widget className={s.widget}>
            <h4 className="mt-0">Login to your workspace</h4>
            <p className="fs-sm text-muted">
              Use the demo credentials to enter the template.
              <br />
              Login: <strong>user</strong> / Password: <strong>password</strong>
            </p>
            <Form className="mt" onSubmit={handleSubmit}>
              {errorMessage ? (
                <Alert color="danger" size="sm">
                  {errorMessage}
                </Alert>
              ) : null}
              <FormGroup>
                <Input
                  className="no-border"
                  name="username"
                  aria-label="Username"
                  onChange={(event) =>
                    setCredentials((current) => ({ ...current, login: event.target.value }))
                  }
                  placeholder="Username"
                  required
                  type="text"
                  value={credentials.login}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="no-border"
                  name="password"
                  aria-label="Password"
                  onChange={(event) =>
                    setCredentials((current) => ({ ...current, password: event.target.value }))
                  }
                  placeholder="Password"
                  required
                  type="password"
                  value={credentials.password}
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-sm text-muted">{backendEnabled ? 'Sign in to the demo workspace.' : 'Local demo session with no backend required.'}</span>
                <div className="d-flex gap-2">
                  <Button color="default" size="sm" tag={Link} to="/register">
                    Create account
                  </Button>
                  <Button color="success" size="sm" type="submit">
                    {status === 'loading' ? 'Loading...' : 'Login'}
                  </Button>
                </div>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
      <Footer className="text-center" />
    </div>
  );
};

export default Login;
