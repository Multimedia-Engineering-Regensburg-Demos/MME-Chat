/* eslint-env node */

const Config = {
  CLIENT_ROUTE: "/chat",
  CLIENT_PATH: "./www",
  CLIENT_PORT: 8080,
  WS_PORT: 8081,
};

Object.freeze(Config);

module.exports = Config;