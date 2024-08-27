const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the client page
app.use('/client', express.static(path.join(__dirname, 'client')));

// Serve the server page
app.use('/server', express.static(path.join(__dirname, 'server')));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from any client or server page
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all clients and server
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
});
