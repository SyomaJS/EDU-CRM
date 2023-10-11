import { Model } from 'sequelize-typescript';
interface UserGoogleAttr {
    id: number;
    email: string;
    displayName: string;
}
export declare class UserGoogle extends Model<UserGoogle, UserGoogleAttr> {
    id: number;
    email: string;
    displayName: string;
}
export {};
