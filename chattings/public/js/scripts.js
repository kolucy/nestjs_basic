const socket = io('/chattings'); // io: socket.io.min.js의 하나의 메소드
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  console.log(`${username} connected!`);
});

//* draw function
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);
// element에 text를 넣는다
function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  }); // 인자1: 이벤트이름, 인자2: 데이터
  /*
  console.log(username);
  socket.on('hello_user', (data) => {
    console.log(data);
  }); */
}

function init() {
  helloUser();
}

init();
