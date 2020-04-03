const socket = io('http://localhost:3000')

// Whenever we recieve 'chat-message', do this
socket.on('chat-message', data => {
  console.log(data);
});