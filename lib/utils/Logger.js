/* eslint-env node */

const Reset = "\x1b[0m",
  FgGreen = "\x1b[32m",
  FgWhite = "\x1b[37m",
  BgRed = "\x1b[41m";

function log(message, label) {
  let now = new Date(),
    hours = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours(),
    minutes = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes(),
    seconds = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds(),
    time = `${hours}:${minutes}:${seconds}`,
    labelString = "";
  if (label) {
    labelString = label;
  }
  console.log(
    `${getFormatedTerminalString(time, FgGreen)} ${getFormatedTerminalString(labelString, BgRed)}\t${getFormatedTerminalString(message, FgWhite)}`
  );
}

function getFormatedTerminalString(string, color) {
  return `${color}${string}${Reset}`;
}

module.exports = {
  log: log,
};