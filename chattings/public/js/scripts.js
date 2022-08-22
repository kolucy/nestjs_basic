const socket = io('/chattings'); // io: socket.io.min.js의 하나의 메소드
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});

//* event callback function
const handleSubmit = (event) => {
  // form에서 submit할 때 event bubbling(새로고침)이 발생하기 때문에 이를 방지하기 위해 event.preventDefault를 사용하여 이벤트의 기본값을 막는다
  event.preventDefault();
  // event.target.elements[0] == input
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에 그리기
    drawNewChat(`me: ${inputValue}`);
    // 채팅을 보낸 후 input창에 남아있는 inputValue를 비운다
    event.target.elements[0].value = '';
  }
};

//* draw function
const drawHelloStranger = (username) =>
  // element에 text를 넣는다
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);
// message를 인자로 받는다
const drawNewChat = (message) => {
  // document에서 'div' element를 만든다
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
      <div>
        ${message}
      </div>
      `;
  // wrapperChatBox에 innerHTML로 chatBox DOM 요소를 삽입한다
  wrapperChatBox.innerHTML = chatBox;
  // drawNewChat 함수가 실행될 때마다 wrapperChatBox가 chattingBoxElement에 하위 DOM 요소로 삽입된다
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  // 인자1: 이벤트이름, 인자2: 데이터
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
  /*
  console.log(username);
  socket.on('hello_user', (data) => {
    console.log(data);
  }); */
}

function init() {
  helloUser();
  // 이벤트 연결
  formElement.addEventListener('submit', handleSubmit);
  // formElement에서 submit을 하는 순간 event function(handleSubmit) 작동
}

init();
