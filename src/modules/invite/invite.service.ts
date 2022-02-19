import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { InviteEntity } from './models/invite';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteEntity)
    private readonly inviteEntityRepository: Repository<InviteEntity>) {
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
    console.log('checkInvitesByEmail');
    return this.inviteEntityRepository.find({
      where: {
        email: email,
      },
    });
  }

  async getInviteByBoard(email: string, boardId: string): Promise<InviteEntity> {
    return this.inviteEntityRepository.findOneOrFail({
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
        invite = this.inviteEntityRepository.create(inviteEntity);
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




