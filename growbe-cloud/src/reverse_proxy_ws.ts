import express from "express";
import cors from "cors";
import * as http from "http";
import {WebSocketServer, WebSocket} from 'ws';
import {filter, Observable, Observer, Subject, take} from "rxjs";

import pb from '@growbe2/growbe-pb';

export class Message {
  topic: string;
  payload: number[];
}


export class ConnectedMainboardContext {
  socket: WebSocket;

  forwarder: Subject<pb.GrowbeCommand> = new Subject();

  constructor(socket: WebSocket) {
    this.socket = socket;

    this.socket.on('message', (data, isBinary) => {
      let message = pb.GrowbeCommand.decode(new Uint8Array(data.slice(0) as any));
      this.forwarder.next(message);
    });
  }

  sendCommand(message: pb.GrowbeCommand): Observable<any> {
    this.socket.send(pb.GrowbeCommand.encode(message).finish(), { binary: true});
    return this.forwarder.asObservable()
      .pipe(
        filter(x => x.topic.includes(message.topic))
      );
  }
}

export class MainboardConnections {
  public static PATH = /^\/mainboard\/([A-Za-z0-9]{6})/

  private maps: {[id: string]: ConnectedMainboardContext} = {};

  onConnection(socket: WebSocket, request: http.IncomingMessage) {
    let matches = request.url?.match(MainboardConnections.PATH);

    if (!matches) {
      socket.close(undefined, "path invalid");
      return;
    }

    let id = matches[1];

    console.log("connection from ", id)

    this.maps[id] = new ConnectedMainboardContext(socket);

    socket.on('close', () => {
      delete this.maps["d"];
      console.log("disconnection from ", id)
    });
  }

  getConnection(id: string): ConnectedMainboardContext {
    return this.maps[id];
  }
}

export class MainboardRequestController {

  constructor(private mainboardConnections: MainboardConnections) {}

  onConnectionStatus(req: express.Request, res: express.Response) {

    res.send("sucess");
  }

  onSendRequest(req: express.Request, res: express.Response) {

    let body = Buffer.from(req.body);
    let id = req.params.id;

    let connection = this.mainboardConnections.getConnection(id);
    if (!connection) {
      return res.status(404).send();
    }

    let payload = pb.GrowbeCommand.decode(body);

    let observable = connection.sendCommand(payload);

    observable.pipe(take(1)).subscribe((response) => {
      if (response.topic.includes("/response")) {
        let actionResponse = pb.ActionResponse.decode(response.payload);
        res.send(actionResponse);
      } else {
        res.send(JSON.stringify(response));
      }
    });
  }

}

export class ReverseProxy {
  public static readonly PORT: number = 3008;
  private app: express.Application;
  private server: http.Server;
  private io: WebSocketServer;
  private port: string | number;

  private mainboardConnections = new MainboardConnections();
  private controller = new MainboardRequestController(this.mainboardConnections);

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(cors());

    const bodyParser = require('body-parser');
    this.app.use(bodyParser.raw({type: 'application/octet-stream', limit : '2mb'}))
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PROXY_PORT || ReverseProxy.PORT;
  }

  private sockets(): void {
    this.io = new WebSocketServer({server: this.server});
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on("connection", 
      (socket: WebSocket, request: http.IncomingMessage) => this.mainboardConnections.onConnection(socket, request)
    );

    this.app.get("/mainboard/:id/status", (req, res) => this.controller.onConnectionStatus(req, res));
    this.app.post("/mainboard/:id/cmd", (req, res) => this.controller.onSendRequest(req, res));
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// MAIN
let app = new ReverseProxy().getApp();
export {app};
