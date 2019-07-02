/* eslint-env browser */

import ChatView from "./ui/ChatView.js";

const SERVER_URL ="ws://localhost:8081";

function init() {
	ChatView.init(document.querySelector("#chat"));
  ChatView.addEventListener("messageCreated", onMessageCreated);

}

function onMessageCreated(event) {
	console.log(`Client created message: ${event.data.text}`);
}

init();