import { Model } from 'sequelize-typescript';
interface RoleUserAttr {
    id: number;
    role_id: number;
    user_unique_id: number;
}
export declare class RoleUser extends Model<RoleUser, RoleUserAttr> {
    id: number;
    role_id: number;
    user_unique_id: number;
}
export {};
