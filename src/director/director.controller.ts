import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { LoginDirectorDto } from './dto/login-director.dto';
import { Request, Response } from 'express';
import { CreateDirectorDto } from './dto/create-director.dto';
import { GoogleAuthGuard } from '../guards/google-director.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePassDto } from './dto/forget-password.dto';

@ApiTags('Directors')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация директора' })
  @ApiBody({ type: CreateDirectorDto })
  register(@Body() createDirectorDto: CreateDirectorDto, @Res() res: Response) {
    return this.directorService.createDirector(createDirectorDto, res);
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: 'Вход для директора' })
  @ApiBody({ type: LoginDirectorDto })
  login(@Body() loginDirectorDto: LoginDirectorDto, @Res() res: Response) {
    return this.directorService.login(loginDirectorDto, res);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Вход с помощью Google' })
  handleLogin() {
    return { msg: 'Google Login Ok' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Редирект после входа через Google' })
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.directorService.getTokenForGoogleUser(req, res);
    return res.json(result);
  }

  @Post('forget/password')
  changePassword(@Body() changePassDto: ChangePassDto) {
    return this.directorService.changePassword(changePassDto);
  }
}
