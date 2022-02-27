let template = content => `<div class="dynamic-content">${content}</div>`
const socket = io.connect('http://168.119.96.183:3001');
const myStorage = window.localStorage;

socket.on('start', o => {
    console.log(o);
    let urls = localStorage.getItem('urls');
    if(!urls) urls = new Set();
    else urls = new Set(Array.from(JSON.parse(urls)));
    urls.add(o.url);
    urls = JSON.stringify(Array.from(urls));
    localStorage.setItem('urls', urls);
    $('#result').append(template(o.url));
    socket.emit('lalala', {res: 'ok'});
});
socket.on("connect", () => {
    const engine = socket.io.engine;
    console.log(engine.transport.name); // in most cases, prints "polling"

    engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(engine.transport.name); // in most cases, prints "websocket"
    });

    engine.on("packet", ({ type, data }) => {
        console.log(type, data)
    });

    engine.on("ololo", ({ type, data }) => {
        console.log('ololo', type, data)
    });

    engine.on("packetCreate", ({ type, data }) => {
        // called for each packet sent
    });

    engine.on("drain", () => {
        // called when the write buffer is drained
    });

    engine.on("close", (reason) => {
        // called when the underlying connection is closed
    });
});
console.log(socket)