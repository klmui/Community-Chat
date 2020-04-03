const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// Whenever we recieve 'chat-message', do this
socket.on('chat-message', data => {
  console.log(data);
});

messageForm.addEventListener('submit', e => {
  // Stop form from submitting to server to stop from refreshing
  // If it does refresh, it would lose all of the chat messages
  e.preventDefault();
  const message = messageInput.value;
  // Send data from client to server
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});