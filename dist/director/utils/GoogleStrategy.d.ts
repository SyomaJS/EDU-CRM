import { Profile, Strategy } from 'passport-google-oauth20';
import { DirectorService } from '../director.service';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly directorService;
    constructor(directorService: DirectorService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<import("../model/director.model copy").Director>;
}
export {};
