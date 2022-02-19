import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { InviteEntity } from './models/invite';
import { UsersService } from '../users/users.service';
import { UsersToBoardsService } from '../userstoboards/userstoboards.service';
import { BoardService } from '../board/board.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteEntity)
    private readonly inviteEntityRepository: Repository<InviteEntity>,
    private readonly usersService: UsersService,
    private readonly usersToBoardsService: UsersToBoardsService,
    private readonly boardService: BoardService,
  ) {
  }

  async getInvite(id: string): Promise<InviteEntity> {
    return this.inviteEntityRepository.findOneOrFail(id);
  }

  async getInvitesByEmail(email: string): Promise<InviteEntity[]> {
    return this.inviteEntityRepository.find({
      where: {
        email: email,
      },
    });
  }

  async checkInvitesByEmail(email: string): Promise<InviteEntity[]> {
    const invites = await this.inviteEntityRepository.find({
      where: {
        email: email,
      },
    });
    if (invites.length > 0) {
      const user = await this.usersService.getUserByEmail(email);
      if (user) {
        invites.forEach(invite => {
          this.boardService.getBoard(invite.boardId).then(board => {
            this.usersToBoardsService.create(user, board, false);
            this.inviteEntityRepository.delete(invite.id);
          });
        });
      }
    }
    return invites;
  }

  async getInviteByBoard(email: string, boardId: string): Promise<InviteEntity> {
    return this.inviteEntityRepository.findOne({
      where: {
        email: email,
        boardId: boardId,
      },
    });
  }

  async create(inviteEntity: InviteEntity): Promise<InviteEntity> {
    let invite: InviteEntity;
    inviteEntity.email = inviteEntity.email.toLowerCase();
    try {
      invite = await this.getInviteByBoard(inviteEntity.email, inviteEntity.boardId);
      if (!invite) {
        invite = await this.inviteEntityRepository.create(inviteEntity);
        return this.inviteEntityRepository.save(invite);
      }
      return invite;
    } catch (e) {

    }
  }

  async deleteInvite(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.inviteEntityRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}




