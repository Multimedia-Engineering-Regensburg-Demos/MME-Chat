/* eslint-env node */

const AnimalAvatar = require("animal-avatars.js"),
  WebSocketServer = require("websocket").server,
  http = require("http"),
  Observable = require("./utils/Observable.js"),
  Logger = require("./utils/Logger.js");

var server, ws, users = [];

function createUserMessage(user) {
  return JSON.stringify({
    type: "USER_DATA",
    id: user.id,
    name: user.name,
    image: user.image,
  });
}

function createChatMessage(message) {
  return JSON.stringify({
    type: "MESSAGE",
    message: message.message,
    user: message.user,
  });
}

function createUser() {
  let avatar = new AnimalAvatar();
  return {
    name: avatar.getAvatarName(),
    image: avatar.getAvatarUrl(),
  };
}

function createServer(port) {
  let server = http.createServer();
  server.listen(port);
  return new WebSocketServer({
    httpServer: server,
  });
}

function broadcastMessage(message) {
  ws.connections.forEach(function each(client) {
    client.sendUTF(message);
  });
}

function onRequest(request) {
  let msg = `New user connected from ${request.origin}`,
    connection = request.accept(null, request.origin),
    user = createUser();
  user.id = Date.now();
  user.connection = connection;
  users.push(users);
  user.connection.on("message", onMessage);
  user.connection.sendUTF(createUserMessage(user));
  Logger.log(msg, "Socket");
}

function onDisconnect(connection) {}

function onMessage(message) {
  let parsedMessage = JSON.parse(message.utf8Data),
    chatMessage = createChatMessage(parsedMessage);
  Logger.log(
    `Message received from user ${parsedMessage.user.id}: ${parsedMessage.message}`,
    "CHAT");
  broadcastMessage(chatMessage);
}

class ChatServer extends Observable.Observable {
  start(port) {
    users = [];
    ws = createServer(port);
    ws.on("request", onRequest);
    Logger.log(`Websocket server started on ws://localhost:${port}`,
      "Socket");
  }
}

server = new ChatServer();
module.exports = server;