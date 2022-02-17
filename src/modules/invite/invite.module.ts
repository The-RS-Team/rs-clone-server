import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteEntity } from './models/invite';

@Module({
  imports: [TypeOrmModule.forFeature([InviteEntity])],
  controllers: [],
  providers: [InviteService],
  exports: [InviteService],
})

export class InviteModule {
}
