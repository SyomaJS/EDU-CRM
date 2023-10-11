import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("./models/role.model").Role>;
    findAll(): Promise<import("./models/role.model").Role[]>;
    findOne(id: string): Promise<import("./models/role.model").Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./models/role.model").Role>;
    remove(id: string): Promise<void>;
}
