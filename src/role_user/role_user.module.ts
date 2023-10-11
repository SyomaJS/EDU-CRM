import { Module } from '@nestjs/common';
import { RoleUserService } from './role_user.service';
import { RoleUserController } from './role_user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleUser } from './models/role_user.model';
import { DirectorModule } from '../director/director.module';
import { Director } from '../director/model/director.model copy';

@Module({
  imports: [SequelizeModule.forFeature([RoleUser, Director]), DirectorModule],
  controllers: [RoleUserController],
  providers: [RoleUserService],
  exports: [RoleUserService],
})
export class RoleUserModule {}
