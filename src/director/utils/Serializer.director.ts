/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { DirectorService } from '../director.service';
import { Director } from '../model/director.model copy';
import { InjectModel } from '@nestjs/sequelize';
import { DirectorDetails } from '../dto/director-google.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('DIRECTOR_SERVICE')
    private readonly directorService: DirectorService,

    @InjectModel(Director) private readonly DirectorModel: typeof Director,
  ) {
    super();
  }

  serializeUser(user: Director, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: DirectorDetails, done: Function) {
    const user = await this.DirectorModel.findOne({
      where: { email: payload.email },
    });

    return user ? done(null, user) : done(null, null);
  }
}
