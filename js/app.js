let template = content => `<div class="dynamic-content">${content}</div>`;
const socket = io.connect(`http://${IP}:3001`);
const myStorage = window.localStorage;

let urls = localStorage.getItem('urls');
if(!urls) urls = new Set();
else urls = new Set(Array.from(JSON.parse(urls)));

urls.forEach(url => {
    $('#result').append(template(url));
});

socket.on('start', o => {
    console.log(o);
    urls.add(o.url);
    localStorage.setItem('urls', JSON.stringify(Array.from(urls)));
    $('#result').append(template(o.url));
    socket.emit('lalala', {res: 'ok'});
});

socket.on('clearAll', o => {
    urls = new Set();
    localStorage.setItem('urls', JSON.stringify(Array.from(urls)));
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
