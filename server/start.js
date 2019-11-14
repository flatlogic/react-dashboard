require("@babel/register")({
  presets: ["@babel/preset-env"],
  "plugins": [
      ["@babel/transform-runtime"]
  ]
});

module.exports = require('./server.js')