const form = document.querySelector(".js-form"),
  input = form.querySelector(".login-input"),
  greeting = document.querySelector(".js-greetings");
const loginScreen = document.querySelector('.login-screen');
const mainScreen = document.querySelector('.main-screen');

const USER_LS = "currentUser",
  SHOWING_CN = "show-flex";
  HIDING_CN = "hide";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  loginScreen.classList.add(SHOWING_CN);
  mainScreen.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  loginScreen.classList.remove(SHOWING_CN);
  mainScreen.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
  greeting.innerText = `Hello, ${text}!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();