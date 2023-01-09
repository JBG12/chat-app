const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const path = require('path');
const socketio = require('socket.io');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

const server = app.listen(3000, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
var io = socketio(server);

app.use(session({
	secret: '21a7d29f0a6b4ecf55224b88dc640a66',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/css.css', function(req, res) {
  res.set('Content-Type', 'text/css');
  res.sendFile(__dirname + '/css.css');
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				request.session.thiss = results[0]['id'];
				// Redirect to home page
				response.redirect('/menu');
                // response.end();
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			// response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		// response.end();
	}
});
// menu page
app.get('/menu', async function(request, response) {
    if (request.session.loggedin) {
        response.write(`<!DOCTYPE html>
        <html>
          <head>
            <title>Chat App</title>
            <script src="/socket.io/socket.io.js"></script>
          </head>
          <body>
            <h1>Chat App</h1>`);
        response.write(`<h2>Chats</h2>`);
        response.write(`<form action="/chats" id="chatForm" method="post">`);
        response.write(`<input type="submit" value="See Chats">`);
        response.write('<br>');
        response.write(`</form>`);
        response.write(`<h2>Create Chat</h2>`);
        response.write(`<select name="onUsers" id="selecting" form="selectForm">`);
        connection.query("SELECT * FROM accounts WHERE logged_in = 'true'", function(error, result, fields) {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                // console.log(row.username);
                response.write(`<option value="${row.id}">${row.username}</option>`);
            });
            response.write(`</select>`);
            response.write(`<form action="/createchat" id="selectForm" method="post">`);
            response.write(`<input type="submit" value="Create Chat">`);
            response.write(`</form>`);
            response.end();
        });
        response.write(`</body>
        </html>`);
    } else {
        response.send('Please login to view this page!');
    }
    // response.end();
});
// users chats overview page
app.post('/chats', function(request, response) {
    if (request.session.loggedin) {
        response.write(`<!DOCTYPE html>
        <html>
          <head>
            <title>Chat App</title>
            <script src="/socket.io/socket.io.js"></script>
          </head>
          <body>
            <h1>Chat App</h1>`);
        response.write(`<h2>Chats</h2>`);
        // response.write(`<div class="chats">`);
        userid = request.session.thiss;
        connection.query("SHOW TABLES like 'chat-%'", function(error, result, fields) {
            Object.keys(result).forEach(function(key) {
                if (error) throw error;
                var row = result[key];
                chatTable = row['Tables_in_nodelogin (chat-%)'];
                // Check for all the users chats
                let resultzero = chatTable.includes(userid + '-');
                let resultone = chatTable.includes('-' + userid);
                // console.log(resultone);
                if ((resultzero === true) || (resultone === true)) {
                    // response.write(`<p>${chatTable}</p>`);
                    response.write(`<form action="/server" id="selectChat" method="post">`);
                    response.write(`<button type="submit" name="userIds" form="selectChat" value="${chatTable}">${chatTable}</button>`);
                    response.write(`</form>`);
                }
            });
            // response.write(`</div>`);
            response.end();
        });
    } else {
        response.send('Please login to view this page!');
    }
});
// create chat page
app.post('/createchat', function(request, response) {
    let selectedUser = request.body.onUsers;
    userid = request.session.thiss;
    chatsave = 'chat-' + userid + '-' + selectedUser;

    connection.query('CREATE TABLE ?? (id int primary key auto_increment, message varchar(50), date datetime default null, user varchar(50))', [chatsave], function (error, results) {
        if (error) throw error;
        response.write(`<h1>Chat Created</h1>`);
    });
    response.end();
});


io.on('connection', function(socket) {
  id = socket.id;
  socket.on('message', (id, currentRoom) => {
      io.to(socket.id).emit('ID', id);
  });

  socket.on('message', (data, currentRoom, selectedUser) => {
      id = socket.id;
      io.to(currentRoom).emit('message', data, id);
      let timeNow = new Date();
      userid = '1';
      if (data && selectedUser) {
        connection.query("INSERT INTO `" + currentRoom + "` (message, date, user) VALUES (?, ?, ?)", [data, timeNow, selectedUser], function(error, result, fields) {
          if (error) throw error;
        });
      }
  });
});

let currentRoom;
// http://localhost:3000/home
app.post('/server', function(request, response) {

  	// If the user is loggedin
if (request.session.loggedin) {
    // name
  let userr = request.session.thiss;
  currentRoom = request.body.userIds;

    // Chat history
  response.write(`<!DOCTYPE html>
  <html>
    <head>
      <title>Chat App</title>
      <script src="/socket.io/socket.io.js"></script>
      <link rel="stylesheet" href="/css.css">
    </head>
    <body>
      <h1>Chat App</h1>`);
  response.write(`<div id="history">`);
  response.write(`</div>`);
  response.write(`<script>`);
  response.write(`var div = document.getElementById('history');`);
  connection.query("SELECT c.message, c.date, c.user, a.username FROM `" + currentRoom + "` c INNER JOIN accounts a ON c.user = a.id", function(error, result, fields) {
    if (result) {
      var html = '';
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        classThis = "other";
        if (row.user == userr) {
          classThis = "user";
        }
        html += `<div class="msgBox"><p class="${classThis}">${row.username}:<br> ${row.message}</p></div>`;
      }
      response.write(`<script>`);
      response.write(`div.innerHTML += '${html}';`);
      response.write(`</script>`);
    }
    response.end();
  });
  response.write(`</script>`);
  // response.write(`</div>`);
  // response.write(`
  // <script>
  // var source = document.getElementById("chat-box");
  // var abc = document.getElementById("history");
  // abc.append(source);
  // </script>`);


  io.on('connection', function(socket) {
    let chatt = request.body.userIds;
    io.to(socket.id).emit('chatt', chatt);
    socket.join(currentRoom);
    // Logging rooms...
    // console.log('TEST1:');
    // for (let [room, sockets] of io.sockets.adapter.rooms) {
    //   console.log(`Room: ${room}, Sockets: ${[...sockets]}`);
    // }
  });
    let chatt = request.body.userIds;
    let selectedUser1 = request.session.thiss;
    response.write(`
        <form method="post" id="chat-form">
          <input type="text" id="chat-input" />
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
    <script src="/socket.io/socket.io.js"></script>
    <script>
    var socket = io();
    //
    var currentRoom;
    socket.on("chatt", function(chatt) {
      currentRoom = chatt;
    });
    socket.on('connect', function() {
      socket.emit('message', document.getElementById('chat-input').value, currentRoom);
    });
    
    // Emits a chat message event with the message when the user submits the form
    document.getElementById('chat-form').addEventListener('submit', function(e) {
      e.preventDefault();
      socket.emit('chat message', document.getElementById('chat-input').value);
    });
    
    // Listens for a chat message event from the server
    socket.on('chat message', function(msg) {
      // Appends the message to the chat log
      document.getElementById('chat-log').append(msg);
    });
    const chatBox = document.getElementById("history");
    
    const chatInput = document.getElementById('chat-input');

    socket.on('message', (data, id) => {
        if (id === socket.id) {
            chatBox.innerHTML += '<div class="msgBox"><p class="user">' + socket.id + ':<br> ' + data + '</p></div>';
        } else {
            // message was sent by another client
            chatBox.innerHTML += '<div class="msgBox"><p class="other">' + id + ':<br> ' + data + '</p></div>';
        }
    });

    // socket.on('message', (data, thisClient) => {
    // chatBox.innerHTML += '<p>' + ': <br>' + data + '</p>';
    // });
    selectedUser = ${selectedUser1};
    document.addEventListener('DOMContentLoaded', () => {
        // Prevent form refresh and send msg.
        document.getElementById('chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('message', chatInput.value, currentRoom, selectedUser);
        // reset input field.
        chatInput.value = '';
        });
    });
    // Set scrollbar of chat always to bottom, updates on receiving message 
    let element = document.getElementById("history");
    let observer = new MutationObserver(function() {
      element.scrollTop = element.scrollHeight;
    });
    observer.observe(element, { childList: true });
    </script>`);
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
});
