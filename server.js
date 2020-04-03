const io = require('socket.io')(process.env.PORT);

const users = {};

// When a user connects
io.on('connection', socket => {
  // Fields can be whatever you want
  // socket.emit('chat-message', 'Welcome!');
  socket.on('new-user', name => {
    users[socket.id] = name;
    // Make sure to handle on client, sent to all other clients
    socket.broadcast.emit('user-connected', {name: name, users: users});

    // Send to current client
    socket.emit('user-connected', {name: name, users: users});
  });

  // When it recives an entry of 'send-chat-message' do this
  socket.on('send-chat-message', message => {
    console.log(message);
    // Send message to all other clients on this server except for person that sent the message
    socket.broadcast.emit('chat-message', { message: message, name:
    users[socket.id] });
  });

  socket.on('send-cat-message', src => {
    // Send message to all other clients on this server except for person that sent the message
    socket.broadcast.emit('cat-message', { src: src, name:
    users[socket.id] });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});