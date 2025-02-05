// Real-time communication refers to the ability of a system to instantly send and receive data as events occur.
// This is essential for applications that need to reflect changes immediately, such as live chats, online games, notifications, etc.
// A common implementation of real-time communication is through WebSockets.

// Real-time communication is used for instant updates between the server and clients 
// without delay. It's ideal for situations like:
// 1. **Live Chat**: Messaging apps like WhatsApp, where messages appear instantly.
// 2. **Collaborative Platforms**: Tools like Google Docs, where users see changes in real-time.
// 3. **Live Notifications**: Apps sending immediate alerts for likes, comments, etc.
// 4. **Online Gaming**: Multiplayer games, where player actions are synchronized instantly.
// 5. **Stock Market**: Platforms displaying real-time stock prices for timely decisions.
// 6. **IoT**: Smart home systems reacting to commands or sensor data instantly.


// WebSockets are a communication protocol that allows for persistent, full-duplex communication channels between clients and servers.
// Unlike traditional HTTP, where the client makes a request and waits for a response, WebSockets allow for bidirectional communication 
// without the need for repeated requests from the client. Once the connection is established, the server can send updates to the client at any time.

// Benefits of Real-Time Communication and Sockets:
// 1. **Instant Data Transfer**: Data can be sent and received in real time, without delays, which is crucial for applications requiring fast updates.
// 2. **Bidirectional Communication**: Both the client and server can send data to each other simultaneously, allowing for interactive features like live chats, notifications, etc.
// 3. **Reduced Overhead**: Unlike HTTP polling (where the client repeatedly checks for new data), WebSockets keep the connection open, which reduces the need for excessive requests and increases efficiency.
// 4. **Better User Experience**: Real-time updates lead to smoother, more dynamic user experiences since users don't need to refresh or wait for new data.
// 5. **Scalability**: WebSockets can be scaled horizontally, allowing real-time data to be delivered to many clients without additional load on the server.

//* to use websocket first thing you must install it (npm i socket.io)
// this example about live chat 
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
// then see the this url to understand how it works https://socket.io/docs/v4/tutorial/introduction
const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.get('/', (req, res) => {
  const messages = [];
  res.render('index', { messages });
});

// When a client connects to the server using WebSockets, this event is triggered.
io.on('connection', (socket) => { 
    console.log('a user connected'); // Log a message indicating that a user has connected.

    // Listen for a 'chat message' event from the client.
    // When a message is received, it is logged and broadcast to all connected clients.
    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`); // Log the received message.
        io.emit('chat message', msg); // Broadcast the message to all connected clients.
    });

    // When a user disconnects, this event is triggered.
    socket.on('disconnect', () => {
        console.log('user disconnected'); // Log that the user has disconnected.
    });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
//to see more about socket you can visit this url : https://socket.io/docs/v4/ 
