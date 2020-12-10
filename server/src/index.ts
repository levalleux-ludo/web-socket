import * as WebSocket from "ws";

console.log('Hello world!');
const ws_port = 13380;
console.log('websocket server listening on port', ws_port);
const wss = new WebSocket.Server({ port: ws_port });
let clientId = 1;

wss.on('connection', (clientWs, request) => {
    const client = clientId++;
    console.log('connection client', client);
    const interval = setInterval(() => {
        console.log('send message to client', client);
        clientWs.send(JSON.stringify({message: 'wake up!'}));
    }, 1000);
    clientWs.onclose = (event) => {
        console.log('disconnection client ', client);
        clearInterval(interval);
    }
})
