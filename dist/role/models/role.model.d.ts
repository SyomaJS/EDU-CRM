import { Model } from 'sequelize-typescript';
interface RoleAttr {
    id: number;
    role: string;
    description: string;
}
export declare class Role extends Model<Role, RoleAttr> {
    id: number;
    role: string;
    description: string;
}
export {};
