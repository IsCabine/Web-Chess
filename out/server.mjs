import * as express from 'express';
import * as http from 'http';
import { Server } from "socket.io";
import * as serverIndex from 'serve-index';
import path from 'path';
import * as url from 'url';
var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express.default();
var server = http.createServer(app);
var io = new Server(server);
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'Static')));
app.use('/lib', express.static(path.join(__dirname, 'lib')), serverIndex.default(path.join(__dirname, 'lib')));
app.get('/', function (_request, response) {
    response.sendFile(path.join(__dirname, 'Static', 'index.html'));
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
