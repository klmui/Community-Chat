const io = require('socket.io')(3000);

// When a user connects
io.on('connection', socket => {
  console.log('New user has connected');
  // Fields can be whatever you want
  socket.emit('chat-message', 'Welcome!');
});