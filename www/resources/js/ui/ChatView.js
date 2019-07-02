/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();

var view,
  listEl,
  inputEl;

function onMessageButtonClicked() {
  let event = new Event("messageCreated", {
    text: inputEl.value,
  });
  view.notifyAll(event);
}

function createMessageElement(text, userName, userImage, isOwnMessage) {
  let container = document.createElement("div"),
    template = MESSAGE_TEMPLATE;
  template = template.replace("{{URL}}", userImage);
  template = template.replace("{{NAME}}", userName);
  template = template.replace("{{TEXT}}", text);
  container.innerHTML = template;
  if (isOwnMessage) {
    container.firstChild.classList.add("own");
  }
  return container.firstChild;
}

class ChatView extends Observable {

  init(el) {
    listEl = el.querySelector("#messages");
    inputEl = el.querySelector("#input textarea");
    el.querySelector(".button.send").addEventListener("click",
      onMessageButtonClicked);
  }

  addMessage(message, isOwnMessage) {
    let messageEl = createMessageElement(message.message, message.user.name,
      message.user.image, isOwnMessage);
    listEl.appendChild(messageEl);
  }

}

view = new ChatView();
export default view;