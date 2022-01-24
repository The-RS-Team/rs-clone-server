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
import {CardEntity} from './modules/card/models/card';
import {CardService} from './modules/card/card.service';

@WebSocketGateway({
    cors: {origin: '*'},
    transports: ['websocket'],
    serveClient: true,
})

export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly cardService: CardService) {
    }

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
        this.logger.log(data);
        client.join(data.room);
    }

    handleConnection(client) {
        this.logger.log('Client connected');
    }

    afterInit(server: any): any {
    }

    handleDisconnect(client: any): any {
    }

    @SubscribeMessage(Messages.newCard)
    newCard(
        @MessageBody() data: any | CardEntity,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            if (data.id <= 0) data.id = null;
            this.cardService.create(data as CardEntity).then(
                (card) => {
                    this.server.emit(Messages.newCard, card)
                }
            );
        }
    }
}
