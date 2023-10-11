import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UniqueID } from './models/uniqueID.model';
import { UniqueIDService } from './uniqueID.service';

@Module({
  imports: [SequelizeModule.forFeature([UniqueID])],
  controllers: [],
  providers: [UniqueIDService],
  exports: [UniqueIDService],
})
export class UniqueIDModule {}
