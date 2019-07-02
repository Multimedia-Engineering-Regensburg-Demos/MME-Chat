/* eslint-env browser */

import ChatClient from "./chat/ChatClient.js";
import ChatView from "./ui/ChatView.js";

const SERVER_URL ="ws://localhost:8081";

var myUser;

function init() {
	ChatView.init(document.querySelector("#chat"));
  ChatView.addEventListener("messageCreated", onMessageCreated);
  ChatClient.connect(SERVER_URL);
  ChatClient.addEventListener("userCreated", onUserCreated);
  ChatClient.addEventListener("messageReceived", onMessageReceived);
}

function onUserCreated(user) {
  myUser = user.data;
}

function onMessageReceived(event) {
	let isOwn = (event.data.user.id === myUser.id);
	ChatView.addMessage(event.data, isOwn);
}

function onMessageCreated(event) {
	ChatClient.send ({
		user: myUser,
		text: event.data.text,
	});
}

init();