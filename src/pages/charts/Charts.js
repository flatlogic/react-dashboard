import React, { PureComponent } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Widget from '../../components/Widget';

// Charts
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PercentAreaChart from './charts/PercentAreaChart';
import PieChart from './charts/PieChart';

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

export default class Charts extends PureComponent {
  render() {
    return(
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Charts</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Pretty <span className="fw-semi-bold">Charts</span></h1>
        <Row>
          <Col xs={12} md={6}>
            <Widget
              title={<h5>Simple <span className="fw-semi-bold">Line Chart</span></h5>}>
              <LineChart data={data} />
            </Widget>
          </Col>
          <Col xs={12} md={6}>
            <Widget
              title={<h5>Simple <span className="fw-semi-bold">Bar Chart</span></h5>}>
              <BarChart data={data} />
            </Widget>
          </Col>
          <Col xs={12}>
            <Widget
              title={<h5>Percent <span className="fw-semi-bold">Area Chart</span></h5>}>
              <PercentAreaChart data={data} />
            </Widget>
          </Col>
          <Col xs={12} md={6}>
            <Widget
              title={<h5>Pie <span className="fw-semi-bold">Chart</span></h5>}>
              <PieChart />
            </Widget>
          </Col>
        </Row>
      </div>
    )
  }
}