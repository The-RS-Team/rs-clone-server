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
import { Actions, Messages, Tables } from './app.constants';
import { CardService } from './modules/card/card.service';
import { ColumnService } from './modules/column/column.service';
import { CreateCardDto } from './modules/card/dto/create-card.dto';
import { UpdateCardDto } from './modules/card/dto/update-card.dto';
import { UpdateColumnDto } from './modules/column/dto/update-column.dto';
import { CreateColumnDto } from './modules/column/dto/create-column.dto';
import { FilesService } from './modules/files/files.service';
import { CreateFilesDto } from './modules/files/dto/create-files.dto';
import { CarditemService } from './modules/carditem/carditem.service';
import { CreateCarditemDto } from './modules/carditem/dto/create-carditem.dto';
import { UpdateCarditemDto } from './modules/carditem/dto/update-carditem.dto';
import { UserInterface } from './modules/users/models/users';
import { ActivityService } from './modules/activity/activity.service';
import { InviteService } from './modules/invite/invite.service';
import { InviteEntity } from './modules/invite/models/invite';

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
    private readonly activityService: ActivityService,
    private readonly inviteService: InviteService,
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
    this.logger.log('createRoom', data.room);
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
  async newCard(
    @MessageBody() data: CreateCardDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        const boardId = await this.getBoardByColumnId(data.columnId);
        this.activityService.save(Actions.insert, boardId, userId, Tables.card, data.title);
        delete data['userId'];
      }
      this.cardService
        .create(data)
        .then((card) => this.server.emit(Messages.newCard, card));
    }
  }

  @SubscribeMessage(Messages.updateCard)
  async updateCard(
    @MessageBody() data: UpdateCardDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        const boardId = await this.getBoardByColumnId(data.columnId);
        this.activityService.save(Actions.update, boardId, userId, Tables.card, data.title);
        delete data['userId'];
      }
      this.cardService
        .updateCard(data)
        .then((card) => this.server.emit(Messages.updateCard, card));
    }
  }

  @SubscribeMessage(Messages.getCard)
  getCard(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService
        .getCard(data.id)
        .then((card) => this.server.emit(Messages.getCard, card));
    }
  }

  @SubscribeMessage(Messages.getCards)
  getCards(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket,
  ): void {
    if (data) {
      this.cardService
        .getCards()
        .then((cards) => this.server.emit(Messages.getCards, cards));
    }
  }

  @SubscribeMessage(Messages.deleteCard)
  async deleteCard(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      const boardId = await this.getBoardIdByCardId(data.id);
      this.activityService.save(Actions.delete, boardId, data.userId, Tables.card, '');

      this.cardService
        .deleteCard(data.id)
        .then((deleteResult) => this.server.emit(Messages.deleteCard, deleteResult));
    }
  }

  //ColumnEntity
  @SubscribeMessage(Messages.newColumn)
  newColumn(
    @MessageBody() data: CreateColumnDto,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        this.activityService.save(Actions.insert, data.boardId, userId, Tables.column, data.title);
        delete data['userId'];
      }

      this.columnService
        .create(data as CreateColumnDto)
        .then((column) => this.server.emit(Messages.newColumn, column));
    }
  }

  @SubscribeMessage(Messages.updateColumn)
  updateColumn(
    @MessageBody() data: UpdateColumnDto,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        this.activityService.save(Actions.update, data.boardId, userId, Tables.column, data.title);
        delete data['userId'];
      }

      this.columnService
        .updateColumn(data as UpdateColumnDto)
        .then((column) => this.server.emit(Messages.updateColumn, column));
    }
  }

  @SubscribeMessage(Messages.getColumn)
  getColumn(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.columnService
        .getColumn(data.id)
        .then((column) => this.server.emit(Messages.getColumn, column));
    }
  }

  @SubscribeMessage(Messages.getColumns)
  getColumns(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.columnService
        .getColumns()
        .then((columns) => this.server.emit(Messages.getColumns, columns));
    }
  }

  @SubscribeMessage(Messages.deleteColumn)
  async deleteColumn(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      const column = await this.columnService.getColumn(data.id);
      this.activityService.save(Actions.delete, column.boardId, data.userId, Tables.column, column.title);

      this.columnService
        .deleteColumn(data.id)
        .then((deleteResult) => this.server.emit(Messages.deleteColumn, deleteResult));
    }
  }

  //Carditem
  @SubscribeMessage(Messages.newCarditem)
  async newCarditem(
    @MessageBody() data: CreateCarditemDto,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      const boardId = await this.getBoardIdByCardId(data.cardId);
      this.activityService.save(Actions.insert, boardId, data.userId, Tables.cardItem, data.info);

      this.carditemService
        .create(data)
        .then((carditem) => this.server.emit(Messages.newCarditem, carditem));
    }
  }

  @SubscribeMessage(Messages.getCarditem)
  getCarditem(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.carditemService
        .getCarditem(data.id)
        .then((carditem) => this.server.emit(Messages.getCarditem, carditem));
    }
  }

  @SubscribeMessage(Messages.getCarditems)
  getCarditems(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.carditemService
        .getCarditems(data.id)
        .then((carditems) => this.server.emit(Messages.getCarditems, carditems));
    }
  }

  @SubscribeMessage(Messages.deleteCarditem)
  async deleteCarditem(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      const boardId = await this.getBoardIdByCardItemId(data.id);
      this.activityService.save(Actions.delete, boardId, data.userId, Tables.cardItem, '');

      this.carditemService
        .deleteCarditem(data.id)
        .then((deleteResult) => this.server.emit(Messages.deleteCarditem, deleteResult));
    }
  }

  @SubscribeMessage(Messages.updateCarditem)
  async updateCarditem(
    @MessageBody() data: UpdateCarditemDto,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        const boardId = await this.getBoardIdByCardItemId(data.id);
        this.activityService.save(Actions.update, boardId, userId, Tables.cardItem, data.info);
        delete data['userId'];
      }
      this.carditemService
        .updateCarditem(data as UpdateCarditemDto)
        .then((carditem) => this.server.emit(Messages.updateCarditem, carditem));
    }
  }

  //Files
  @SubscribeMessage(Messages.newFile)
  async newFile(
    @MessageBody() data: CreateFilesDto,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        const boardId = await this.getBoardIdByCardId(data.cardId);
        this.activityService.save(Actions.insert, boardId, userId, Tables.file, data.originalname);
        delete data['userId'];
      }

      this.filesService
        .create(data)
        .then((data) => this.server.emit(Messages.newFile, data.id));
    }
  }

  @SubscribeMessage(Messages.getFile)
  getFile(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.filesService
        .getFile(data.id)
        .then((file) => this.server.emit(Messages.getFile, file));
    }
  }

  @SubscribeMessage(Messages.getFiles)
  getFiles(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.filesService
        .getFiles(data.id)
        .then((files) => this.server.emit(Messages.getFiles, files));
    }
  }

  @SubscribeMessage(Messages.deleteFile)
  async deleteFile(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      if ('userId' in data) {
        const userId = data['userId'];
        const file = await this.filesService.getFile(data.id);
        const boardId = await this.getBoardIdByCardId(file.cardId);
        this.activityService.save(Actions.delete, boardId, userId, Tables.file, file.originalname);
        delete data['userId'];
      }

      this.filesService
        .deleteFile(data.id)
        .then((deleteResult) => this.server.emit(Messages.deleteFile, deleteResult));
    }
  }

  //Activity
  @SubscribeMessage(Messages.getAtivityByUser)
  getAtivityByUser(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.activityService
        .getAtivityByUser(data.id)
        .then((items) => this.server.emit(Messages.getAtivityByUser, items));
    }
  }

  @SubscribeMessage(Messages.getAtivityByBoard)
  getAtivityByBoard(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): void {
    if (data) {
      this.activityService
        .getAtivityByBoard(data.id)
        .then((items) => this.server.emit(Messages.getAtivityByBoard, items));
    }
  }

  //Invite
  @SubscribeMessage(Messages.newInvite)
  async newInvite(
    @MessageBody() data: InviteEntity,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      console.log('newInvite', data);
      this.inviteService
        .create(data)
        .then((data) => this.server.emit(Messages.newInvite, data));
    }
  }

  @SubscribeMessage(Messages.getInvite)
  async getInvite(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      this.inviteService
        .getInvite(data.id)
        .then((data) => this.server.emit(Messages.getInvite, data));
    }
  }

  @SubscribeMessage(Messages.deleteInvite)
  async deleteInvite(
    @MessageBody() data: UserInterface,
    @ConnectedSocket() client: Socket): Promise<void> {
    if (data) {
      this.inviteService
        .deleteInvite(data.id)
        .then((deleteResult) => this.server.emit(Messages.deleteInvite, deleteResult));
    }
  }

  //getBoardId
  private async getBoardByColumnId(columnId: string): Promise<string> {
    const column = await this.columnService.getColumn(columnId);
    return column.boardId;
  }

  private async getBoardIdByCardId(cardId: string): Promise<string> {
    const card = await this.cardService.getCard(cardId);
    const column = await this.columnService.getColumn(card.columnId);
    return column.boardId;
  };

  private async getBoardIdByCardItemId(cardItemId: string): Promise<string> {
    const cardItem = await this.carditemService.getCarditem(cardItemId);
    const card = await this.cardService.getCard(cardItem.cardId);
    const column = await this.columnService.getColumn(card.columnId);
    return column.boardId;
  };
}
