import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.logger.log(payload);
    setTimeout(() => {
      this.server.emit('message', { testEvent: 'test' });
    }, 3000);
  }

  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.room);
  }

  handleConnection(client) {
    this.logger.log(`Client connected`);
  }

  afterInit(server: any): any {}

  handleDisconnect(client: any): any {}
}
