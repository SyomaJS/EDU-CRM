import { Model } from 'sequelize-typescript';
interface DirectorAttr {
    id: number;
    unique_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    hashed_password: string;
    hashed_token: string;
}
export declare class Director extends Model<Director, DirectorAttr> {
    id: number;
    unique_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    hashed_password: string;
    hashed_token: string;
}
export {};
