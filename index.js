/* eslint-env node */

const Config = require("./config.js"),
  Logger = require("./lib/utils/Logger.js");

function init() {
  Logger.log("Node.js application started", "Info");
}

init();