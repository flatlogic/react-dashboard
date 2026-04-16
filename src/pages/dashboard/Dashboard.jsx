import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
  ArrowUp,
  ArrowDown,
  People,
  Cart,
  CurrencyDollar,
  Activity,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from '../../features/posts/postsSlice';
import Widget from '../../components/Widget';
import { getDashboardData, timeframeOptions } from './mock';
import s from './Dashboard.module.scss';

const STORAGE_KEY = 'dashboard_timeframe';
const DEFAULT_TIMEFRAME = '7d';

const formatDate = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};

const getStoredTimeframe = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && timeframeOptions.some(opt => opt.value === stored)) {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to read timeframe from localStorage:', e);
  }
  return DEFAULT_TIMEFRAME;
};

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

const TimeframeSelector = ({ value, onChange }) => (
  <ButtonGroup className={s.timeframeGroup}>
    {timeframeOptions.map((option) => (
      <Button
        key={option.value}
        color={value === option.value ? 'primary' : 'secondary'}
        outline={value !== option.value}
        onClick={() => onChange(option.value)}
        className={s.timeframeButton}
      >
        {option.label}
      </Button>
    ))}
  </ButtonGroup>
);

const StatCard = ({ icon: Icon, title, value, growth, color }) => {
  const isPositive = growth >= 0;
  return (
    <Widget className={s.statCard}>
      <div className={s.statCardInner}>
        <div className={s.statCardIcon} style={{ backgroundColor: `${color}15`, color }}>
          <Icon size={24} />
        </div>
        <div className={s.statCardContent}>
          <div className={s.statCardTitle}>{title}</div>
          <div className={s.statCardValue}>{formatNumber(value)}</div>
          <div className={`${s.statCardGrowth} ${isPositive ? s.statCardGrowthPositive : s.statCardGrowthNegative}`}>
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{Math.abs(growth)}%</span>
            <span className={s.statCardGrowthLabel}>vs 上期</span>
          </div>
        </div>
      </div>
    </Widget>
  );
};

const EmptyState = ({ title, message, icon: Icon }) => (
  <div className={s.emptyState}>
    <div className={s.emptyStateIcon}>
      {Icon ? <Icon size={48} /> : null}
    </div>
    <h5 className={s.emptyStateTitle}>{title}</h5>
    <p className={s.emptyStateMessage}>{message}</p>
  </div>
);

const MainChart = ({ data, hasData }) => {
  if (!hasData || data.length === 0) {
    return (
      <EmptyState
        title="暂无数据"
        message="该时间段内没有可用的统计数据，请尝试切换其他时间段"
        icon={Activity}
      />
    );
  }

  return (
    <ResponsiveContainer height={350} width="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
        <XAxis
          dataKey="name"
          stroke="#6c757d"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6c757d"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e9ecef',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#3754a5"
          strokeWidth={2}
          dot={{ r: 4, fill: '#3754a5' }}
          activeDot={{ r: 6 }}
          name="页面访问"
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#eb3349"
          strokeWidth={2}
          dot={{ r: 4, fill: '#eb3349' }}
          activeDot={{ r: 6 }}
          name="独立访客"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const fetchStatus = useAppSelector((state) => state.posts.fetchStatus);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [timeframe, setTimeframe] = useState(getStoredTimeframe);

  useEffect(() => {
    if (fetchStatus === 'idle' && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus, posts.length]);

  const handleTimeframeChange = useCallback((newTimeframe) => {
    setTimeframe(newTimeframe);
    try {
      localStorage.setItem(STORAGE_KEY, newTimeframe);
    } catch (e) {
      console.warn('Failed to save timeframe to localStorage:', e);
    }
  }, []);

  const dashboardData = useMemo(
    () => getDashboardData(timeframe),
    [timeframe]
  );

  const { stats, chartData, hasData } = dashboardData;

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  const statCards = [
    {
      icon: People,
      title: '总用户数',
      value: stats.totalUsers,
      growth: stats.userGrowth,
      color: '#3754a5',
    },
    {
      icon: Activity,
      title: '活跃用户',
      value: stats.activeUsers,
      growth: stats.userGrowth,
      color: '#1ab394',
    },
    {
      icon: Cart,
      title: '新订单',
      value: stats.newOrders,
      growth: stats.orderGrowth,
      color: '#f3c363',
    },
    {
      icon: CurrencyDollar,
      title: '总收入',
      value: stats.revenue,
      growth: stats.orderGrowth,
      color: '#eb3349',
    },
  ];

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>
      <div className={s.pageHeader}>
        <h1 className="mb-lg mb-0">Dashboard</h1>
        <TimeframeSelector value={timeframe} onChange={handleTimeframeChange} />
      </div>

      <Row className="mb-lg">
        {statCards.map((card, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Col>
        ))}
      </Row>

      <Widget
        title={
          <div className={s.chartTitle}>
            <h5 className="mt-0 mb-0">
              <Activity className="me-2 opacity-75" />
              数据趋势
            </h5>
            <span className={s.chartSubtitle}>基于当前选择的时间段</span>
          </div>
        }
        className="mb-lg"
      >
        <MainChart data={chartData} hasData={hasData} />
      </Widget>

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
                <p className={s.recentPostsHint}>Latest entries from the local demo feed.</p>
              </div>
            )}
          >
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
                {fetchStatus !== 'loading' && recentPosts.length === 0 ? (
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
