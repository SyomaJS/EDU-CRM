import { ModelCtor } from 'sequelize-typescript';
import { CreateRoleUserDto } from './dto/create-role_user.dto';
import { UpdateRoleUserDto } from './dto/update-role_user.dto';
import { RoleUser } from './models/role_user.model';
import { Director } from '../director/model/director.model copy';
export declare class RoleUserService {
    private readonly roleUserModel;
    private readonly directorModel;
    constructor(roleUserModel: ModelCtor<RoleUser>, directorModel: typeof Director);
    create(createRoleUserDto: CreateRoleUserDto): Promise<RoleUser>;
    findAll(): Promise<RoleUser[]>;
    findOne(id: number): Promise<RoleUser>;
    update(id: number, updateRoleUserDto: UpdateRoleUserDto): Promise<RoleUser>;
    remove(id: number): Promise<void>;
}
