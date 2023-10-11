import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dto/login-director.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UniqueIDService } from '../uniqueID/uniqueID.service';
import { Director } from './model/director.model copy';
import { DirectorDetails } from './dto/director-google.dto';
import { UserGoogle } from './model/director-google.model';
import { ChangePassDto } from './dto/forget-password.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director) private directorModel: typeof Director,
    @InjectModel(UserGoogle) private userModel: typeof UserGoogle,
    private readonly jwtService: JwtService,
    private readonly uniqueIdService: UniqueIDService,
  ) {}

  //* For Google Auth!
  async validateUser(details: DirectorDetails) {
    const user = await this.directorModel.findOne({
      where: { email: details.email },
    });

    if (user) return user;

    throw new UnauthorizedException('You must be admin ');
  }

  async createDirector(createDirectorDto: CreateDirectorDto, res: Response) {
    try {
      //* Check if password director is correct !
      if (
        createDirectorDto.director_password != process.env.DIRECTOR_PASSWORD
      ) {
        throw new ForbiddenException('Wrong director password');
      }

      //* Check if email unique !
      const checkEmail = await this.directorModel.findOne({
        where: { email: createDirectorDto.email },
      });
      if (checkEmail) {
        throw new BadRequestException(
          'Director with such email already exists',
        );
      }

      const uniqueID = Number(await this.uniqueIdService.generateID());

      const director = await this.directorModel.create({
        ...createDirectorDto,
        hashed_password: await bcrypt.hash(createDirectorDto.password, 7),
        unique_id: uniqueID,
      });

      const tokens = await this.getTokens(director);

      director.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 21 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return director.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login({ phone_number, password }: LoginDirectorDto, res: Response) {
    const director = await this.directorModel.findOne({
      where: { phone_number: phone_number },
    });

    if (!director) {
      throw new ForbiddenException('Phone number or password is incorrect ..');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      director.hashed_password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Phone number or password is incorrect ..',
      );
    }

    const tokens = await this.getTokens(director);
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedDirector = await this.directorModel.update(
      { hashed_token: hashed_token },
      { where: { id: director.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 21 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      msg: 'Director logged in',
      director: updatedDirector[1][0],
      tokens,
    };

    res.status(HttpStatus.OK).json(response);
  }

  async getTokenForGoogleUser(req: Request, res: Response) {
    const user: any = req.user;
    if (!user) {
      throw new UnauthorizedException('Unauthorized access ...');
    }

    const email = user?.dataValues?.email;
    if (!email) {
      throw new UnauthorizedException('Unauthorized access email...');
    }

    const director = await this.directorModel.findOne({
      where: { email: email },
    });

    if (!director) {
      throw new UnauthorizedException('There is no such a director');
    }

    const tokens = await this.getTokens(director);

    director.hashed_token = await bcrypt.hash(tokens.refresh_token, 8);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 21 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return director;
  }

  async changePassword(changePassDto: ChangePassDto) {
    const director = await this.directorModel.findOne({
      where: { id: changePassDto.id },
    });

    if (!director) throw new NotFoundException('There is no user with such id');

    const isTheSame = bcrypt.compare(
      changePassDto.old_password,
      director.hashed_password,
    );

    if (!isTheSame) throw new BadRequestException('Wrong old password ...');

    director.hashed_password = await bcrypt.hash(changePassDto.new_password, 7);

    return await director.save();
  }

  //* * * * * * * * * * * | TOOLS | * * * * * * * * * * *

  async getTokens(director: Director) {
    const jwtPayload = {
      id: director.id,
      uniqueID: director.unique_id,
      email: director.email,
      role: 'DIRECTOR',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
