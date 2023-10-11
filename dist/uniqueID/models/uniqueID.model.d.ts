import { Model } from 'sequelize-typescript';
interface uniqueIDAttr {
    unique_id: number;
}
export declare class UniqueID extends Model<uniqueIDAttr> {
    unique_id: number;
}
export {};
