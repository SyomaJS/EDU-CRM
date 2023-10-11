import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dto/login-director.dto';
import { Request, Response } from 'express';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UniqueIDService } from '../uniqueID/uniqueID.service';
import { Director } from './model/director.model copy';
import { DirectorDetails } from './dto/director-google.dto';
import { UserGoogle } from './model/director-google.model';
import { ChangePassDto } from './dto/forget-password.dto';
export declare class DirectorService {
    private directorModel;
    private userModel;
    private readonly jwtService;
    private readonly uniqueIdService;
    constructor(directorModel: typeof Director, userModel: typeof UserGoogle, jwtService: JwtService, uniqueIdService: UniqueIDService);
    validateUser(details: DirectorDetails): Promise<Director>;
    createDirector(createDirectorDto: CreateDirectorDto, res: Response): Promise<Director>;
    login({ phone_number, password }: LoginDirectorDto, res: Response): Promise<void>;
    getTokenForGoogleUser(req: Request, res: Response): Promise<Director>;
    changePassword(changePassDto: ChangePassDto): Promise<Director>;
    getTokens(director: Director): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
