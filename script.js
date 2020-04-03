const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const userContainer = document.getElementById('user-container');
const catForm = document.getElementById('cat-button');

var name = null;
do {
  name = prompt('What is your name?');
} while (name == "");
appendMessage("You joined");
appendUser(name);
// Send message to server
socket.emit('new-user', name);

// Whenever we recieve 'chat-message', do this
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
  appendUser(name);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
  removeUser(name);
});


messageForm.addEventListener('submit', e => {
  // Stop form from submitting to server to stop from refreshing
  // If it does refresh, it would lose all of the chat messages
  e.preventDefault();
  const message = messageInput.value;
  // Show message on your screen
  appendMessage(`You: ${message}`);
  // Send data from client to server
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

catForm.addEventListener('submit', e => {
  e.stop();
  e.preventDefault();


  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function appendUser(user) {
  const userElement = document.createElement('li');
  userElement.innerText = user;
  userContainer.append(userElement);
}

function removeUser(user) {
  $("li").each(function() {
    console.log("li");
    console.log($(this)[0].innerHTML);
   if ($(this)[0].innerHTML == user) {
      $(this).hide();
      return;
    }
  });
}