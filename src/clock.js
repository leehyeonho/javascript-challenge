const clockContainer = document.querySelector(".js-clock");
const clockTime = clockContainer.querySelector(".time");
const clockDate = clockContainer.querySelector(".date");

const extendDateTime_Time = document.querySelector(".datetime-extend__datetime__time");
const extendDateTime_Date = document.querySelector(".datetime-extend__datetime__date");

let thisYear = '';
let thisMonth = '';
let thisDay = '';

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  thisYear = date.getFullYear();
  thisMonth = date.getMonth();
  thisDay = date.getDate();
  clockTime.innerText = `${
                          hours < 12 ? "오전" : "오후"
                         } ${
                          hours > 12 ? hours-12 : hours
                         }:${
                          minutes < 10 ? `0${minutes}` : minutes
                         }`;
  clockDate.innerText = `${
                          date.getFullYear()
                         }-${
                          date.getMonth()+1
                         }-${
                          date.getDate()
                         }`;
  extendDateTime_Time.innerText = `${
                                hours < 12 ? "오전" : "오후"
                              } ${
                                hours > 12 ? hours-12 : hours
                              }:${
                                minutes < 10 ? `0${minutes}` : minutes
                              }:${
                                seconds < 10 ? `0${seconds}` : seconds
                              }`;
  extendDateTime_Date.innerText = `${
                                    date.getFullYear()
                                   }년 ${
                                    date.getMonth()+1
                                   }월 ${
                                    date.getDate()
                                   }일`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
