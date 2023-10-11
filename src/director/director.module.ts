import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { UniqueIDModule } from '../uniqueID/uniqueID.module';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { Director } from './model/director.model copy';
import { UserGoogle } from './model/director-google.model';
import { SessionSerializer } from './utils/Serializer.director';

@Module({
  imports: [
    SequelizeModule.forFeature([Director, UserGoogle]),
    JwtModule.register({}),
    UniqueIDModule,
  ],
  controllers: [DirectorController],
  providers: [
    DirectorService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'DIRECTOR_SERVICE',
      useClass: DirectorService,
    },
  ],
  exports: [DirectorService],
})
export class DirectorModule {}
