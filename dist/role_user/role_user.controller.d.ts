import { RoleUserService } from './role_user.service';
import { CreateRoleUserDto } from './dto/create-role_user.dto';
import { UpdateRoleUserDto } from './dto/update-role_user.dto';
export declare class RoleUserController {
    private readonly roleUserService;
    constructor(roleUserService: RoleUserService);
    create(createRoleUserDto: CreateRoleUserDto): Promise<import("./models/role_user.model").RoleUser>;
    findAll(): Promise<import("./models/role_user.model").RoleUser[]>;
    findOne(id: string): Promise<import("./models/role_user.model").RoleUser>;
    update(id: string, updateRoleUserDto: UpdateRoleUserDto): Promise<import("./models/role_user.model").RoleUser>;
    remove(id: string): Promise<void>;
}
