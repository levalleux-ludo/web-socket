"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = __importStar(require("ws"));
console.log('Hello world!');
var ws_port = 13380;
console.log('websocket server listening on port', ws_port);
var wss = new WebSocket.Server({ port: ws_port });
var clientId = 1;
wss.on('connection', function (clientWs, request) {
    var client = clientId++;
    console.log('connection client', client);
    var interval = setInterval(function () {
        console.log('send message to client', client);
        clientWs.send(JSON.stringify({ message: 'wake up!' }));
    }, 1000);
    clientWs.onclose = function (event) {
        console.log('disconnection client ', client);
        clearInterval(interval);
    };
});
