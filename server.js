const io = require('socket.io')(3000);

// When a user connects
io.on('connection', socket => {
  console.log('New user has connected');
  // Fields can be whatever you want
  socket.emit('chat-message', 'Welcome!');
  // When it recives an entry of 'send-chat-message' do this
  socket.on('send-chat-message', message => {
    console.log(message);
    // Send message to all other clients on this server except for person that sent the message
    socket.broadcast.emit('chat-message', message);
  });
});