const express = require('express');
const http = require('http');
const socketIO= require('socket.io');

const app =express();
const server = http.createServer(app);
const io = socketIO(server);


io.on('connection',(socket) => {
    console.log('New User connected');

    //event to share note updates
    socket.on('noteUpdate',(updatedNote) => {
        //broadcast the updated notes to all connected clients
        socket.broadcast.emit('noteUpdate',updatedNote);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));