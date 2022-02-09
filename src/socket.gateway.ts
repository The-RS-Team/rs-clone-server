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
import { Messages } from './app.constants';
import { CardService } from './modules/card/card.service';
import { ColumnService } from './modules/column/column.service';
import { CreateCardDto } from './modules/card/dto/create-card.dto';
import { UpdateCardDto } from './modules/card/dto/update-card.dto';
import { UpdateColumnDto } from './modules/column/dto/update-column.dto';
import { CreateColumnDto } from './modules/column/dto/create-column.dto';
import { FilesService } from './modules/files/files.service';
import { CreateFilesDto } from './modules/files/dto/create-files.dto';
import { CarditemService } from './modules/carditem/carditem.service';
import { CreateCarditemDto } from './modules/carditem/dto/create-cartitem.dto';
import { UpdateCarditemDto } from './modules/carditem/dto/update-carditem.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
  serveClient: true,
})

export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('"Trello"');

  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService,
    private readonly filesService: FilesService,
    private readonly carditemService: CarditemService,
  ) {
  }

  @SubscribeMessage(Messages.hello)
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(data);
    setTimeout(() => {
      this.server.emit(Messages.newMessage, { testEvent: 'test' });
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
    if (data) {
      this.cardService
        .create(data)
        .then((card) => this.server.emit(Messages.newCard, card));
    }
  }

  @SubscribeMessage(Messages.updateCard)
  updateCard(
    @MessageBody() data: UpdateCardDto,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService
        .updateCard(data)
        .then((card) => this.server.emit(Messages.updateCard, card));
    }
  }

  @SubscribeMessage(Messages.getCard)
  getCard(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService
        .getCard(data)
        .then((card) => this.server.emit(Messages.getCard, card));
    }
  }

  @SubscribeMessage(Messages.getCards)
  getCards(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService
        .getCards()
        .then((cards) => this.server.emit(Messages.getCards, cards));
    }
  }

  @SubscribeMessage(Messages.deleteCard)
  deleteCard(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService.deleteCard(data as string).then((deleteResult) => {
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
      this.columnService
        .create(data as CreateColumnDto)
        .then((column) => this.server.emit(Messages.newColumn, column));
    }
  }

  @SubscribeMessage(Messages.updateColumn)
  updateColumn(
    @MessageBody() data: UpdateColumnDto,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.columnService
        .updateColumn(data as UpdateColumnDto)
        .then((column) => this.server.emit(Messages.updateColumn, column));
    }
  }

  @SubscribeMessage(Messages.getColumn)
  getColumn(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.columnService
        .getColumn(data as string)
        .then((column) => this.server.emit(Messages.getColumn, column));
    }
  }

  @SubscribeMessage(Messages.getColumns)
  getColumns(
    @MessageBody() data: any | number,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.columnService
        .getColumns()
        .then((columns) => this.server.emit(Messages.getColumns, columns));
    }
  }

  @SubscribeMessage(Messages.deleteColumn)
  deleteColumn(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.columnService.deleteColumn(data as string).then((deleteResult) => {
        this.server.emit(Messages.deleteColumn, deleteResult);
      });
    }
  }

  //Carditem
  @SubscribeMessage(Messages.newCarditem)
  newCarditem(
    @MessageBody() data: CreateCarditemDto,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.carditemService
        .create(data)
        .then((carditem) => this.server.emit(Messages.newCarditem, carditem));
    }
  }

  @SubscribeMessage(Messages.getCarditem)
  getCarditem(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.carditemService
        .getCarditem(data)
        .then((carditem) => this.server.emit(Messages.getCarditem, carditem));
    }
  }

  @SubscribeMessage(Messages.getCarditems)
  getCarditems(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.carditemService
        .getCarditems(data)
        .then((carditem) => this.server.emit(Messages.getCarditems, carditem));
    }
  }

  @SubscribeMessage(Messages.deleteCarditem)
  deleteCarditem(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.carditemService
        .deleteCarditem(data)
        .then((deleteResult) => {
          this.server.emit(Messages.deleteCarditem, deleteResult);
        });
    }
  }

  @SubscribeMessage(Messages.updateCarditem)
  updateCarditem(
    @MessageBody() data: UpdateCarditemDto,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.carditemService
        .updateCarditem(data as UpdateCarditemDto)
        .then((carditem) => this.server.emit(Messages.updateCarditem, carditem));
    }
  }

  //Files
  @SubscribeMessage(Messages.newFile)
  newFile(
    @MessageBody() data: CreateFilesDto,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.filesService
        .create(data)
        .then((data) => this.server.emit(Messages.newFile, data.id));
    }
  }

  @SubscribeMessage(Messages.getFile)
  getFile(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.filesService
        .getFile(data as string)
        .then((file) => this.server.emit(Messages.getFile, file));
    }
  }

  @SubscribeMessage(Messages.getFiles)
  getFiles(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.filesService
        .getFiles(data)
        .then((files) => this.server.emit(Messages.getFiles, files));
    }
  }

  @SubscribeMessage(Messages.deleteFile)
  deleteFile(
    @MessageBody() data: any | string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.filesService.deleteFile(data as string).then((deleteResult) => {
        this.server.emit(Messages.deleteFile, deleteResult);
      });
    }
  }
}
