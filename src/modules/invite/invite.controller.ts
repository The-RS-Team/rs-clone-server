import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '../users/models/users';
import { CurrentUser } from '../../utils/decorators/user.decorator';
import { InviteService } from './invite.service';
import { InviteEntity } from './models/invite';

@Controller('')
export class InviteController {
  constructor(private readonly inviteService: InviteService,
  ) {
  }

  @Get('/invite/')
  @ApiBearerAuth()
  async checkInvitesByEmail(@CurrentUser() user: UserEntity): Promise<InviteEntity[]> {
    if (user) {
      return this.inviteService.checkInvitesByEmail(user.email);
    }
  }

  async getInvite(@Param('id', ParseUUIDPipe) id: string): Promise<InviteEntity> {
    return this.inviteService.getInvite(id);
  }

}
