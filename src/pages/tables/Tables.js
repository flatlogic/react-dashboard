import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Sparklines, SparklinesBars } from 'react-sparklines';

import Widget from '../../components/Widget';
import s from './Static.scss';

class Tables extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          picture: require('../../images/tables/1.jpg'), // eslint-disable-line global-require
          description: 'Palo Alto',
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '45.6 KB',
          progress: {
            percent: 29,
            colorClass: 'success',
          },
        },
        {
          id: 2,
          picture: require('../../images/tables/2.jpg'), // eslint-disable-line global-require
          description: 'The Sky',
          info: {
            type: 'PSD',
            dimensions: '2400x1455',
          },
          date: new Date('November 14, 2012'),
          size: '15.3 MB',
          progress: {
            percent: 33,
            colorClass: 'warning',
          },
        },
        {
          id: 3,
          picture: require('../../images/tables/3.jpg'), // eslint-disable-line global-require
          description: 'Down the road',
          label: {
            colorClass: 'success',
            text: 'INFO!',
          },
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '49.0 KB',
          progress: {
            percent: 38,
            colorClass: 'inverse',
          },
        },
        {
          id: 4,
          picture: require('../../images/tables/4.jpg'), // eslint-disable-line global-require
          description: 'The Edge',
          info: {
            type: 'PNG',
            dimensions: '210x160',
          },
          date: new Date('September 15, 2012'),
          size: '69.1 KB',
          progress: {
            percent: 17,
            colorClass: 'danger',
          },
        },
        {
          id: 5,
          picture: require('../../images/tables/5.jpg'), // eslint-disable-line global-require
          description: 'Fortress',
          info: {
            type: 'JPEG',
            dimensions: '1452x1320',
          },
          date: new Date('October 1, 2012'),
          size: '2.3 MB',
          progress: {
            percent: 41,
            colorClass: 'primary',
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };

    this.checkAll = this.checkAll.bind(this);
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');
    return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = (new Array(this.state[checkbox].length)).fill(ev.target.checked);
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Tables Basic</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Tables - <span className="fw-semi-bold">Basic</span></h1>
        <Row>
          <Col sm={12}>
            <Widget
              title={<h5>
                Table <span className="fw-semi-bold">Styles</span>
              </h5>} settings close
            >
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    <th>Picture</th>
                    <th>Description</th>
                    <th className="hidden-sm-down">Info</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Size</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.tableStyles.map(row =>
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <img className="img-rounded" src={row.picture} alt="" height="60" />
                      </td>
                      <td>
                        {row.description}
                        {row.label &&
                        <div>
                          <Badge color={row.label.colorClass}>{row.label.text}</Badge>
                        </div>
                        }
                      </td>
                      <td>
                        <p className="mb-0">
                          <small>
                            <span className="fw-semi-bold">Type:</span>
                            <span className="text-muted">&nbsp; {row.info.type}</span>
                          </small>
                        </p>
                        <p>
                          <small>
                            <span className="fw-semi-bold">Dimensions:</span>
                            <span className="text-muted">&nbsp; {row.info.dimensions}</span>
                          </small>
                        </p>
                      </td>
                      <td className="text-semi-muted">
                        {this.parseDate(row.date)}
                      </td>
                      <td className="text-semi-muted">
                        {row.size}
                      </td>
                      <td className="width-150">
                        <Progress
                          style={{height: '7px'}}
                          color="success" value={row.progress.percent}
                          className="progress-sm mb-xs rounded mt-xs"
                        />
                      </td>
                    </tr>,
                  )
                }
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="danger" className="mr-xs" size="sm">Send to...</Button>
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="default" className="mr-xs" size="sm" caret>Clear</DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Clear</DropdownItem>
                      <DropdownItem>Move ...</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <p>Basic table with styled content</p>
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
            >
              <h3>Stripped <span className="fw-semi-bold">Table</span></h3>

              <p>Each row is highlighted. You will never lost there. Just <code>.table-striped</code> it.</p>
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox1" type="checkbox" checked={this.state.checkboxes1[0]}
                          onChange={event => this.checkAll(event, 'checkboxes1')}
                        />
                        <Label for="checkbox1" />
                      </div>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox2" type="checkbox" checked={this.state.checkboxes1[1]}
                          onChange={event => this.changeCheck(event, 'checkboxes1', 1)}
                        />
                        <Label for="checkbox2" />
                      </div>
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Badge color="danger">Online</Badge></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox3" type="checkbox" checked={this.state.checkboxes1[2]}
                          onChange={event => this.changeCheck(event, 'checkboxes1', 2)}
                        />
                        <Label for="checkbox3" />
                      </div>
                    </td>
                    <td>Jacob <Badge color="warning" className="text-gray-dark">ALERT!</Badge></td>
                    <td>Thornton</td>
                    <td><span className="badge bg-gray">Away</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox4" type="checkbox" checked={this.state.checkboxes1[3]}
                          onChange={event => this.changeCheck(event, 'checkboxes1', 3)}
                        />
                        <Label for="checkbox4" />
                      </div>
                    </td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td><Badge color="danger">Construct</Badge></td>
                  </tr>
                </tbody>
              </Table>
              <br /><br />
              <h3>Hover <span className="fw-semi-bold">Table</span></h3>
              <p>{'Trace only what\'s really important. '}<code>.table-hover</code> is made for it.</p>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td><a href="#">ottoto@example.com</a></td>
                      <td><Badge color="gray" className="text-gray" pill>Pending</Badge></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td><a href="#">fat.thor@example.com</a></td>
                      <td><Badge color="gray" className="text-gray-light" pill>Unconfirmed</Badge></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td><a href="#">larry@example.com</a></td>
                      <td><Badge color="gray" className="text-gray" pill>New</Badge></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Peter</td>
                      <td>Horadnia</td>
                      <td><a href="#">peter@example.com</a></td>
                      <td><Badge color="gray" className="text-gray-light" pill>Active</Badge></td>
                    </tr>
                  </tbody>
                  {/* eslint-enable */}
                </Table>
              </div>
            </Widget>
          </Col>
          <Col lg={6}>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
            >
              <h3>Bordered <span className="fw-semi-bold">Table</span></h3>
              <p>Each row is highlighted. You will never lost there. That&apos;s how
                all of us learned in school the table should look like. Just add
                <code>.table-bordered</code> to it.</p>
              <Table className="table-bordered table-lg mt-lg mb-0">
                <thead className="text-uppercase">
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox10" type="checkbox" checked={this.state.checkboxes2[0]}
                          onChange={event => this.checkAll(event, 'checkboxes2')}
                        />
                        <Label for="checkbox10" />
                      </div>
                    </th>
                    <th>Product</th>
                    <th className="text-right">Price</th>
                    <th className="text-center">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox11" type="checkbox" checked={this.state.checkboxes2[1]}
                          onChange={event => this.changeCheck(event, 'checkboxes2', 1)}
                        />
                        <Label for="checkbox11" />
                      </div>
                    </td>
                    <td>On the Road</td>
                    <td className="text-right">$25 224.2</td>
                    <td className="text-center">
                      <Sparklines data={[13, 14, 16, 15, 4, 14, 20]} style={{ width: '35px', height: '20px' }}>
                        <SparklinesBars style={{ stroke: 'white', fill: '#618fb0' }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox12" type="checkbox" checked={this.state.checkboxes2[2]}
                          onChange={event => this.changeCheck(event, 'checkboxes2', 2)}
                        />
                        <Label for="checkbox12" />
                      </div>
                    </td>
                    <td>HP Core i7</td>
                    <td className="text-right">$87 346.1</td>
                    <td className="text-center">
                      <Sparklines data={[14, 12, 16, 11, 17, 19, 16]} style={{ width: '35px', height: '20px' }}>
                        <SparklinesBars style={{ stroke: 'white', fill: '#999' }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox13" type="checkbox" checked={this.state.checkboxes2[3]}
                          onChange={event => this.changeCheck(event, 'checkboxes2', 3)}
                        />
                        <Label for="checkbox13" />
                      </div>
                    </td>
                    <td>Let&apos;s Dance</td>
                    <td className="text-right">$57 944.6</td>
                    <td className="text-center">
                      <Sparklines data={[11, 17, 19, 16, 14, 12, 16]} style={{ width: '35px', height: '20px' }}>
                        <SparklinesBars style={{ stroke: 'white', fill: '#f0b518' }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox14" type="checkbox" checked={this.state.checkboxes2[4]}
                          onChange={event => this.changeCheck(event, 'checkboxes2', 4)}
                        />
                        <Label for="checkbox14" />
                      </div>
                    </td>
                    <td>Air Pro</td>
                    <td className="text-right">$118 533.1</td>
                    <td className="text-center">
                      <Sparklines data={[13, 14, 20, 16, 15, 4, 14]} style={{ width: '35px', height: '20px' }}>
                        <SparklinesBars style={{ stroke: 'white', fill: '#e5603b' }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <Input
                          id="checkbox15" type="checkbox" checked={this.state.checkboxes2[5]}
                          onChange={event => this.changeCheck(event, 'checkboxes2', 5)}
                        />
                        <Label for="checkbox15" />
                      </div>
                    </td>
                    <td>Version Control</td>
                    <td className="text-right">$72 854.5</td>
                    <td className="text-center">
                      <Sparklines data={[16, 15, 4, 14, 13, 14, 20]} style={{ width: '35px', height: '20px' }}>
                        <SparklinesBars style={{ stroke: 'white', fill: '#618fb0' }} />
                      </Sparklines>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>}
            >
              <h3>Overflow <span className="fw-semi-bold">Table</span></h3>
              <p>
                Add any non-bordered .table within a widget for a seamless design.
                Awesome look for no cost.
                Just wrap the table with simple css class <code>.widget-table-overflow</code> inside
                of widget
              </p>
              <div className="widget-table-overflow">
                <Table className="table-striped table-lg mt-lg mb-0">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox20" type="checkbox" checked={this.state.checkboxes3[0]}
                            onChange={event => this.checkAll(event, 'checkboxes3')}
                          />
                          <Label for="checkbox20" />
                        </div>
                      </th>
                      <th>Product</th>
                      <th className="text-right">Price</th>
                      <th className="text-center">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox21" type="checkbox" checked={this.state.checkboxes3[1]}
                            onChange={event => this.changeCheck(event, 'checkboxes3', 1)}
                          />
                          <Label for="checkbox21" />
                        </div>
                      </td>
                      <td>On the Road</td>
                      <td className="text-right">$25 224.2</td>
                      <td className="text-center">
                        <Sparklines data={[13, 14, 16, 15, 4, 14, 20]} style={{ width: '35px', height: '20px' }}>
                          <SparklinesBars style={{ stroke: 'white', fill: '#618fb0' }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox22" type="checkbox" checked={this.state.checkboxes3[2]}
                            onChange={event => this.changeCheck(event, 'checkboxes3', 2)}
                          />
                          <Label for="checkbox22" />
                        </div>
                      </td>
                      <td>HP Core i7</td>
                      <td className="text-right">$87 346.1</td>
                      <td className="text-center">
                        <Sparklines data={[14, 12, 16, 11, 17, 19, 16]} style={{ width: '35px', height: '20px' }}>
                          <SparklinesBars style={{ stroke: 'white', fill: '#999' }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox23" type="checkbox" checked={this.state.checkboxes3[3]}
                            onChange={event => this.changeCheck(event, 'checkboxes3', 3)}
                          />
                          <Label for="checkbox23" />
                        </div>
                      </td>
                      <td>Let&apos;s Dance</td>
                      <td className="text-right">$57 944.6</td>
                      <td className="text-center">
                        <Sparklines data={[11, 17, 19, 16, 14, 12, 16]} style={{ width: '35px', height: '20px' }}>
                          <SparklinesBars style={{ stroke: 'white', fill: '#f0b518' }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox24" type="checkbox" checked={this.state.checkboxes3[4]}
                            onChange={event => this.changeCheck(event, 'checkboxes3', 4)}
                          />
                          <Label for="checkbox24" />
                        </div>
                      </td>
                      <td>Air Pro</td>
                      <td className="text-right">$118 533.1</td>
                      <td className="text-center">
                        <Sparklines data={[13, 14, 20, 16, 15, 4, 14]} style={{ width: '35px', height: '20px' }}>
                          <SparklinesBars style={{ stroke: 'white', fill: '#e5603b' }} />
                        </Sparklines>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox25" type="checkbox" checked={this.state.checkboxes3[5]}
                            onChange={event => this.changeCheck(event, 'checkboxes3', 5)}
                          />
                          <Label for="checkbox25" />
                        </div>
                      </td>
                      <td>Version Control</td>
                      <td className="text-right">$72 854.5</td>
                      <td className="text-center">
                        <Sparklines data={[16, 15, 4, 14, 13, 14, 20]} style={{ width: '35px', height: '20px' }}>
                          <SparklinesBars style={{ stroke: 'white', fill: '#618fb0' }} />
                        </Sparklines>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withStyles(s)(Tables);
