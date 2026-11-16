import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonDropdown,
  ButtonGroup,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import {
  Bell,
  ChatDots,
  Cloud,
  Eye,
  Person,
  Telephone,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from '../../features/posts/postsSlice';
import Widget from '../../components/Widget';
import s from './Dashboard.module.scss';

const formatDate = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

const quickLinks = [
  {
    to: '/app/main',
    label: 'Incoming calls',
    icon: Telephone,
    badge: { color: 'danger', value: '3' },
  },
  {
    to: '/app/notifications',
    label: 'Notifications',
    icon: Bell,
    badge: { color: 'warning', value: '6' },
  },
  {
    to: '/app/posts',
    label: 'Messages',
    icon: ChatDots,
    badge: { color: 'success', value: '18' },
  },
  {
    to: '/app/main',
    label: 'Visits total',
    icon: Eye,
  },
  {
    to: '/app/main',
    label: 'Inbox',
    icon: Cloud,
  },
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const fetchStatus = useAppSelector((state) => state.posts.fetchStatus);
  const postsError = useAppSelector((state) => state.posts.error);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    if (fetchStatus === 'idle' && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus, posts.length]);

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Dashboard</h1>
      <Row>
        <Col md={6} sm={12}>
          <Widget
            title={(
              <div>
                <div className="pull-right mt-n-xs">
                  <input
                    className="form-control input-sm"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
                <h5 className="mt-0 mb-3">
                  <Person className="me-2 opacity-75" />
                  Users
                </h5>
              </div>
            )}
          >
            <Table borderless className="mb-0" responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', 'Alice', 'alice@email.com', 'active', 'success'],
                  ['2', 'Bob', 'bob@email.com', 'delayed', 'warning'],
                  ['3', 'Duck', 'duck@email.com', 'active', 'success'],
                  ['4', 'Shepherd', 'shepherd@email.com', 'removed', 'danger'],
                ].map(([id, username, email, status, color]) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>
                      <span className={`py-0 px-1 rounded text-white bg-${color}`}>{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Widget>
        </Col>
        <Col md={6} sm={12}>
          <Widget title="Alerts">
            <Alert className="alert-sm" color="warning">
              <span className="fw-semi-bold">Warning:</span> Track dependency drift proactively.
            </Alert>
            <Alert className="alert-sm" color="success">
              <span className="fw-semi-bold">Success:</span> The template now boots on a modern runtime.
            </Alert>
            <Alert className="alert-sm" color="info">
              <span className="fw-semi-bold">Info:</span> Demo data is local-first and easy to replace.
            </Alert>
            <Alert className="alert-sm d-flex justify-content-between align-items-center" color="danger">
              <span>
                <span className="fw-semi-bold">Action:</span> Connect a real API before production.
              </span>
              <div className="d-flex align-items-center gap-2">
                <Button color="danger" size="sm">
                  Review
                </Button>
                <Button color="default" size="sm">
                  Ignore
                </Button>
              </div>
            </Alert>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Widget
            title={(
              <div>
                <div className="pull-right mt-n-xs">
                  <Link className={s.recentPostsOptions} to="/app/main">
                    Options
                  </Link>
                </div>
                <h5 className="mt-0 mb-0 d-flex align-items-center flex-wrap gap-2">
                  Recent posts
                  <Badge className={s.recentPostsCount} color="success" pill>
                    {recentPosts.length}
                  </Badge>
                </h5>
                <p className={s.recentPostsHint}>Latest posts in this workspace.</p>
              </div>
            )}
          >
            {postsError && <p className="alert alert-danger" role="alert">{postsError}</p>}
            <table className={`table table-sm table-no-border mb-0 ${s.recentPostsTable}`}>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className={s.recentPostRow}>
                    <td className={s.recentPostDate}>{formatDate(post.updatedAt)}</td>
                    <td className={s.recentPostTitleCell}>
                      <Link className={s.recentPostLink} to="/app/posts">
                        {post.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                {fetchStatus === 'loading' ? (
                  <tr>
                    <td className={s.recentPostsState} colSpan="2">
                      Loading...
                    </td>
                  </tr>
                ) : null}
                {fetchStatus === 'succeeded' && recentPosts.length === 0 ? (
                  <tr>
                    <td className={s.recentPostsState} colSpan="2">
                      No posts yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <div className={s.recentPostsFooter}>
              <Link className={`btn btn-default ${s.recentPostsButton}`} to="/app/posts">
                View all Posts
                <Badge className={s.recentPostsTotal} color="danger" pill>
                  {posts.length}
                </Badge>
              </Link>
            </div>
          </Widget>
        </Col>
        <Col sm={6}>
          <ListGroup className={s.quickLinksList}>
            {quickLinks.map(({ badge, icon: ShortcutIcon, label, to }) => (
              <Link className={s.quickLinkItem} key={label} to={to}>
                <span className={s.quickLinkIcon}>
                  <ShortcutIcon aria-hidden="true" />
                </span>
                <span className={s.quickLinkLabel}>{label}</span>
                {badge ? (
                  <Badge className={s.quickLinkBadge} color={badge.color} pill>
                    {badge.value}
                  </Badge>
                ) : (
                  <span aria-hidden="true" className={s.quickLinkArrow}>
                    →
                  </span>
                )}
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Widget className="mt-lg" title="Some standard reactstrap components">
        <Row>
          <Col sm={6}>
            <div className="mt">
              <Button className="mr-sm mb-xs" color="default" size="sm">
                Default
              </Button>
              <Button className="mr-sm mb-xs" color="success" size="sm">
                Success
              </Button>
              <Button className="mr-sm mb-xs" color="info" size="sm">
                Info
              </Button>
              <Button className="mr-sm mb-xs" color="warning" size="sm">
                Warning
              </Button>
              <Button className="mb-xs" color="danger" size="sm">
                Danger
              </Button>
            </div>
            <ButtonGroup className="mb">
              <Button color="default">1</Button>
              <Button color="default">2</Button>
              <ButtonDropdown isOpen={isDropdownOpened} toggle={() => setIsDropdownOpened((value) => !value)}>
                <DropdownToggle caret color="default">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>1</DropdownItem>
                  <DropdownItem>2</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <p className="mb-0">
              For more components, check the{' '}
              <a href="https://reactstrap.github.io/" rel="noreferrer" target="_blank">
                reactstrap documentation
              </a>
              .
            </p>
          </Col>
          <Col sm={6}>
            <Progress className="progress-sm" color="success" value={40} />
            <Progress className="progress-sm" color="info" value={20} />
            <Progress className="progress-sm" color="warning" value={60} />
            <Progress className="progress-sm" color="danger" value={80} />
          </Col>
        </Row>
      </Widget>
    </div>
  );
};

export default Dashboard;
