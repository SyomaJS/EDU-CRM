import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectorModule } from './director/director.module';
import { UniqueIDModule } from './uniqueID/uniqueID.module';
import { UniqueID } from './uniqueID/models/uniqueID.model';
import { Director } from './director/model/director.model copy';
import { RoleModule } from './role/role.module';
import { RoleUserModule } from './role_user/role_user.module';
import { UserGoogle } from './director/model/director-google.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Director, UniqueID, UserGoogle],
      autoLoadModels: true,
      logging: false,
    }),
    DirectorModule,
    UniqueIDModule,
    RoleModule,
    RoleUserModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
