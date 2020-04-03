const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage("You joined");
// Send message to server
socket.emit('new-user', name);

// Whenever we recieve 'chat-message', do this
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
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

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}