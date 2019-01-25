/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import createBrowserHistory from 'history/createBrowserHistory';

// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
export default process.env.BROWSER && createBrowserHistory();
