import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import s from './Dashboard.scss';

const Dashboard = () => (
  <div className={s.root}>
    <h1>Dashboard</h1>
    <p><Button bsStyle="info">Default</Button></p>
    <div>
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <DropdownButton title="Dropdown" id="bg-nested-dropdown">
          <MenuItem eventKey="1">Dropdown link</MenuItem>
          <MenuItem eventKey="2">Dropdown link</MenuItem>
        </DropdownButton>
      </ButtonGroup>
    </div>
  </div>
);

export default withStyles(s)(Dashboard);
