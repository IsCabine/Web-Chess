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
var express = __importStar(require("express"));
var http = __importStar(require("http"));
var socket_io_1 = require("socket.io");
var posix_1 = require("path/posix");
var app = express.default();
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
console.log((0, posix_1.join)(__dirname, 'Client'));
app.use(express.static((0, posix_1.join)(__dirname, 'Client')));
app.use(express.static((0, posix_1.join)(__dirname, 'Static')));
app.get('/', function (_request, response) {
    response.sendFile((0, posix_1.join)(__dirname, 'Static', 'index.html'));
});
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
server.listen(80, function () {
    console.log('listening on *:80');
});
