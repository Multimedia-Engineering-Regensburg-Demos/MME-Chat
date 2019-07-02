/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

var connection, client;

function parseMessage(message) {
  return JSON.parse(message);
}

function createChatMessage(message) {
  return JSON.stringify({
    type: "MESSAGE",
    message: message.text,
    user: message.user,
  });
}

function createUserEvent(message) {
  let event = new Event("userCreated", {
    id: message.id,
    name: message.name,
    image: message.image,
  });
  return event;
}

function createMessageEvent(message) {
  let event = new Event("messageReceived", {
    user: message.user,
    message: message.message,
  });
  return event;
}

function handleMessage(message) {
  let event;
  switch (message.type) {
    case "USER_DATA":
      event = createUserEvent(message);
      break;
    case "MESSAGE":
      event = createMessageEvent(message);
      break;
    default:
      break;
  }
  if (event !== undefined) {
    client.notifyAll(event);
  }
}

function onOpen(event) {
  console.log("Connected to WebSocket server");
}

function onError(error) {
  console.error(error);
}

function onMessage(message) {
  let parsedMessage;
  console.log("Received message from server");
  parsedMessage = parseMessage(message.data);
  handleMessage(parsedMessage);
}

class ChatClient extends Observable {

  connect(url) {
    connection = new WebSocket(url);
    connection.onopen = onOpen;
    connection.onerror = onError;
    connection.onmessage = onMessage;
  }

  send(message) {
    let chatMsg = createChatMessage(message);
    connection.send(chatMsg);
  }

}

client = new ChatClient();
export default client;