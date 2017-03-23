/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import s from './Home.scss';

class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <p><Button bsStyle="info">Default</Button></p>
          <p>
            <ButtonGroup>
              <Button>1</Button>
              <Button>2</Button>
              <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                <MenuItem eventKey="1">Dropdown link</MenuItem>
                <MenuItem eventKey="2">Dropdown link</MenuItem>
              </DropdownButton>
            </ButtonGroup>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
