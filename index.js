/* eslint-env node */

const express = require("express"),
  Config = require("./config.js"),
  Logger = require("./lib/utils/Logger.js"),
  ChatServer = require("./lib/ChatServer.js");

var app = express();

function init() {
  startChatServer();
  startClient();
}

function startChatServer() {
  ChatServer.start(Config.WS_PORT);
}

function startClient() {
  app.use(Config.CLIENT_ROUTE, express.static(Config.CLIENT_PATH));
  app.listen(Config.CLIENT_PORT, function() {
    Logger.log(
      `Client served at http://localhost:${Config.CLIENT_PORT}${Config.CLIENT_ROUTE}`,
      "HTTP"
    );
  });
}

init();