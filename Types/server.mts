import * as express from 'express';
import * as http from 'http';
import { Socket } from 'socket.io';
import { Server } from "socket.io";
import * as serverIndex from  'serve-index';

import path from 'path';
import * as url from 'url';
const __filename: string = url.fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

type Response = express.Response;
type Request = express.Request;

const app = express.default();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'Static')));
app.use('/lib', express.static(path.join(__dirname, 'lib')), serverIndex.default(path.join(__dirname, 'lib')));

app.get('/', (_request: Request, response: Response) => {
   response.sendFile(path.join(__dirname, 'Static', 'index.html'));
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