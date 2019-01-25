/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const path = require('path');
const fm = require('front-matter');
const MarkdownIt = require('markdown-it');

module.exports = function markdownLoader(source) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
  });

  const frontmatter = fm(source);
  frontmatter.attributes.key = path.basename(this.resourcePath, '.md');
  frontmatter.attributes.html = md.render(frontmatter.body);

  return `module.exports = ${JSON.stringify(frontmatter.attributes)};`;
};
