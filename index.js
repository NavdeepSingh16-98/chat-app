const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on('connection',(socket)=>{
    console.log('a user connected:', socket.id);

    socket.on('send name',(userName)=>{
        console.log('server recv name:', userName);
        io.emit('send name',userName);
    });

    socket.on('send message',(chat)=>{
        console.log('server recv message:', chat);
        io.emit('send message',chat);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(port,()=>{
    console.log(`server listening on ${port}`)
});
