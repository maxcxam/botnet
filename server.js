const { createServer } = require("http");
const { mongoose, Schema } = require('mongoose');
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const httpServer = createServer();
const path = require('path');
const room = 'simple'
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());

const uri =
    "mongodb://localhost:27017/uri";
mongoose.connect(uri);

const uriSchema = new Schema({
    uri:  String, // String is shorthand for {type: String}
    title: String
});
const uriObj = mongoose.model('Uri', uriSchema)
let uris = uriObj.find({}).then(console.log);

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
        uriObj.find({}).then(e => {
            console.log(e);
            for(el of e) io.emit('start', { 'url': el.uri})
        })
    })

    res.render(path.join(__dirname, '/view/index.html'), {uri: process.env.IP})
})

app.get('/api/host/:host', (req, res) => {

})

app.get('/admin', (req, res) => {
    io.to(room).emit('start', {'url': 'https://google1.com'});
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(Array.from(clients).length)
    res.send('ok ' + Array.from(clients).length)
})

app.get('/clearAll', (req, res) => {
    io.to(room).emit('clearAll');
    res.send('ok ')
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
    let reqBody = req.body;
    if(reqBody.url) {
        let newUri = new uriObj({uri: reqBody.url, title: reqBody.url});
        newUri.save();
        io.to(room).emit('start', {'url': reqBody.url});
        res.json({ok: true})
    } else res.json({ok: false})

})
httpServer.listen(3001);
http.createServer(app).listen(3000);