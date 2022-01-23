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
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {Messages} from './app.constants';

@WebSocketGateway({
    cors: {origin: '*'},
    transports: ['websocket', 'polling'],
    serveClient: true,
})

export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage(Messages.hello)
    handleMessage(@MessageBody() data: string,
                  @ConnectedSocket() client: Socket): void {
        this.logger.log(data);
        setTimeout(() => {
            this.server.emit(Messages.newMessage, {testEvent: 'test'});
        }, 3000);
    }

    @SubscribeMessage(Messages.createRoom)
    createRoom(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ): void {
        client.join(data.room);
    }

    handleConnection(client) {
        this.logger.log(`Client connected`);
    }

    afterInit(server: any): any {
    }

    handleDisconnect(client: any): any {
    }
}
