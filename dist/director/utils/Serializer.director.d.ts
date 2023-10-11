import { PassportSerializer } from '@nestjs/passport';
import { DirectorService } from '../director.service';
import { Director } from '../model/director.model copy';
import { DirectorDetails } from '../dto/director-google.dto';
export declare class SessionSerializer extends PassportSerializer {
    private readonly directorService;
    private readonly DirectorModel;
    constructor(directorService: DirectorService, DirectorModel: typeof Director);
    serializeUser(user: Director, done: Function): void;
    deserializeUser(payload: DirectorDetails, done: Function): Promise<any>;
}
