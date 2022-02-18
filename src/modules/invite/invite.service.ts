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

  async getInviteByEmail(email: string): Promise<InviteEntity> {
    return this.inviteEntityRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(inviteEntity: InviteEntity): Promise<InviteEntity> {
    let invite: InviteEntity;
    inviteEntity.email = inviteEntity.email.toLowerCase();
    try {
      invite = await this.getInviteByEmail(inviteEntity.email);
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




