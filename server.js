const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const httpServer = createServer();
const path = require('path');
const room = 'simple'
const app = express();
app.use(express.json());
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:3005",
        methods: ["GET", "POST"]
    }
});

io.on('lalala', console.log);

app.get('/', (req, res) => {
    io.on('connect', socket => {
        socket.join(room);
        console.log('connected');
        io.emit('ololo', { blabla: 'tratata'})
    })

    res.sendFile(path.join(__dirname, '/view/index.html'))
})

app.get('/admin', (req, res) => {
    io.to(room).emit('start', {'url': 'https://google.com'});
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(Array.from(clients).length)
    res.send('ok ' + Array.from(clients).length)
})

app.get('/add', (req,res) => {
    res.sendFile(path.join(__dirname, '/view/admin/addNewUrl.html'))
})

app.post('/add', (req,res) => {
    res.json({requestBody: req.body})
})
httpServer.listen(3004);
http.createServer(app).listen(3005);