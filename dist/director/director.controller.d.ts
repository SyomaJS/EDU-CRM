import { DirectorService } from './director.service';
import { LoginDirectorDto } from './dto/login-director.dto';
import { Request, Response } from 'express';
import { CreateDirectorDto } from './dto/create-director.dto';
import { ChangePassDto } from './dto/forget-password.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    register(createDirectorDto: CreateDirectorDto, res: Response): Promise<import("./model/director.model copy").Director>;
    login(loginDirectorDto: LoginDirectorDto, res: Response): Promise<void>;
    handleLogin(): {
        msg: string;
    };
    handleRedirect(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(changePassDto: ChangePassDto): Promise<import("./model/director.model copy").Director>;
}
