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
import {CardService} from './modules/card/card.service';
import {ColumnService} from './modules/column/column.service';
import {CreateCardDto} from './modules/card/dto/create-card.dto';
import {UpdateCardDto} from './modules/card/dto/update-card.dto';
import {UpdateColumnDto} from './modules/column/dto/update-column.dto';
import {CreateColumnDto} from './modules/column/dto/create-column.dto';

@WebSocketGateway({
    cors: {origin: '*'},
    transports: ['websocket'],
    serveClient: true,
})

export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly cardService: CardService,
        private readonly columnService: ColumnService) {
    }

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('"Trello"');

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

    //CardEntity
    @SubscribeMessage(Messages.newCard)
    newCard(
        @MessageBody() data: CreateCardDto,
        @ConnectedSocket() client: Socket,
    ): void {
        console.log(data)
        if (data) {
            this.cardService.create(data).then(card => this.server.emit(Messages.newCard, card));
        }
    }

    @SubscribeMessage(Messages.updateCard)
    updateCard(
        @MessageBody() data: UpdateCardDto,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.cardService.updateCard(data).then(card => this.server.emit(Messages.updateCard, card));
        }
    }

    @SubscribeMessage(Messages.getCard)
    getCard(
        @MessageBody() data: any | string,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.cardService.getCard(data).then(card => this.server.emit(Messages.getCard, card));
        }
    }

    @SubscribeMessage(Messages.getCards)
    getCards(
        @MessageBody() data: any | string,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.cardService.getCards().then(cards => this.server.emit(Messages.getCards, cards));
        }
    }

    @SubscribeMessage(Messages.deleteCard)
    deleteCard(
        @MessageBody() data: any | string,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.cardService.deleteCard(data as string).then(deleteResult => {
                this.logger.log('deleteResult', deleteResult);
                this.server.emit(Messages.deleteCard, deleteResult);
            });
        }
    }

    //ColumnEntity
    @SubscribeMessage(Messages.newColumn)
    newColumn(
        @MessageBody() data: CreateColumnDto,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.columnService.create(data as CreateColumnDto).then(column => this.server.emit(Messages.newColumn, column));
        }
    }

    @SubscribeMessage(Messages.updateColumn)
    updateColumn(
        @MessageBody() data: UpdateColumnDto,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.columnService.updateColumn(data as UpdateColumnDto).then(column => this.server.emit(Messages.updateColumn, column));
        }
    }

    @SubscribeMessage(Messages.getColumn)
    getColumn(
        @MessageBody() data: any | string,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.columnService.getColumn(data as string).then(column => this.server.emit(Messages.getColumn, column));
        }
    }

    @SubscribeMessage(Messages.getColumns)
    getColumns(
        @MessageBody() data: any | number,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.columnService.getColumns().then(columns => this.server.emit(Messages.getColumns, columns));
        }
    }

    @SubscribeMessage(Messages.deleteColumn)
    deleteColumn(
        @MessageBody() data: any | string,
        @ConnectedSocket() client: Socket,
    ): void {
        if (data) {
            this.columnService.deleteColumn(data as string).then(deleteResult => {
                this.server.emit(Messages.deleteColumn, deleteResult)
            });
        }
    }
}
