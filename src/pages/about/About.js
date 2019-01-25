/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

import Page from '../../components/Page';
import withMeta from '../../core/withMeta';

class About extends React.Component {
  static meta = {
    title: 'About page!!1',
    description: 'About description',
  };

  state = {};

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const data = await require.ensure(
      [],
      require => require('./about.md'),
      'about',
    );
    this.setState({
      data,
    });
  }

  render() {
    return (
      <Page
        title={this.state.data ? this.state.data.title : ''}
        html={this.state.data ? this.state.data.html : ''}
      />
    );
  }
}

export default withMeta(About);
