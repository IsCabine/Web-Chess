import * as express from 'express';
import * as http from 'http';
import { Socket } from 'socket.io';
import { Server } from "socket.io";

import { join } from 'path/posix';

type Response = express.Response;
type Request = express.Request;

const app = express.default();
const server = http.createServer(app);
const io = new Server(server);

console.log(join(__dirname, 'Client'));

app.use(express.static(join(__dirname, 'Client')));
app.use(express.static(join(__dirname, 'Static')));

app.get('/', (_request: Request, response: Response) => {
   response.sendFile(join(__dirname, 'Static', 'index.html'));
});

io.on('connection', (socket: Socket) => {
   console.log('A user connected');

   socket.on('disconnect', () => {
      console.log('A user disconnected');
   });
});

server.listen(80, () => {
   console.log('listening on *:80');
});