/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize';
import config from '../../server/config';

// uncomment this and configure connection to your local db, firts goes db name, username, password. In you db create table posts with id, title, content, createdAt, updatedAt 
// const sequelize = new Sequelize('sequelize', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,
// });

const sequelize = new Sequelize(config.databaseUrl, {
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
