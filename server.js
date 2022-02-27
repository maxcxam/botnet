const { createServer } = require("http");
const { MongoClient } = require('mongodb');
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
        origin: `http://${process.env.IP}:3000`,
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
    io.to(room).emit('start', {'url': 'https://google1.com'});
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(Array.from(clients).length)
    res.send('ok ' + Array.from(clients).length)
})
app.get('/a/:uri', (req, res) => {
    let uri = req.params.uri;
    io.to(room).emit('start', {'url': uri});
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(Array.from(clients).length)
    res.send('ok ' + Array.from(clients).length)
})

app.get('/add', (req,res) => {
    res.sendFile(path.join(__dirname, '/view/admin/addNewUrl.html'))
})

app.get('/js/app.js', (req,res) => {
    res.sendFile(path.join(__dirname, '/js/app.js'))
})

app.post('/add', (req,res) => {
    res.json({requestBody: req.body})
})
httpServer.listen(3001);
http.createServer(app).listen(3000);