const socket = io("https://community-chat.netlify.app/?");
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const userContainer = document.getElementById('user-container');
const catForm = document.getElementById('send-cat-container');
const userCol = document.getElementById('user-col');

var name = null;
do {
  name = prompt('What is your name?');
} while (name == "");

// Send message to server
socket.emit('new-user', name);

// Whenever we recieve 'chat-message', do this
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
  scrollToBottom();
  extendCol();
});

// Whenever we recieve 'chat-message', do this
socket.on('cat-message', data => {
  appendImage(`${data.name}`, `${data.src}`);
  scrollToBottom();
  extendCol();
});

socket.on('user-connected', data => {
  appendMessage(`${data.name} connected`);
  console.log(Object.values(data.users));
  updateUsers(Object.values(data.users));
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
  scrollToBottom();
  extendCol();
});

catForm.addEventListener('submit', e => {
  e.preventDefault();
  $.getJSON("https://aws.random.cat/meow")
  .done(function(data) {
    const src = data.file;
    appendImage("You", src);
    socket.emit('send-cat-message', src);
  });
  messageInput.value = '';
  scrollToBottom();
  extendCol();
});

function scrollToBottom() {
  $("html, body").animate({ 
    scrollTop: $( 
      'html, body').get(0).scrollHeight 
  }, 1000);
}

function extendCol() {
  // Extend user col
  var newHeight = $('html, body').get(0).scrollHeight + 'px';
  userCol.style.height = newHeight;
}

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function appendImage(name, src) {
  name = name + ": ";
  var div = document.createElement('div');
  div.innerHTML= name + "<img src='" + src + "' width=250px height=250px>"
  messageContainer.append(div);
}

function updateUsers(users) {
  // Remove all users from user container
  $("li").each(function() {
      $(this).hide();
  });

  // Add all users from user container
  users.forEach(function(user) {
    const userElement = document.createElement('li');
    userElement.innerText = user;
    userContainer.append(userElement);
  });
}

function removeUser(user) {
  $("li").each(function() {
   if ($(this)[0].innerHTML == user) {
      $(this).fadeOut("slow", function() {
        return false;
      });
    }
  });
}