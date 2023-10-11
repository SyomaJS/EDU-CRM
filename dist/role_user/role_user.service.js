"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const role_user_model_1 = require("./models/role_user.model");
const director_model_copy_1 = require("../director/model/director.model copy");
let RoleUserService = class RoleUserService {
    constructor(roleUserModel, directorModel) {
        this.roleUserModel = roleUserModel;
        this.directorModel = directorModel;
    }
    async create(createRoleUserDto) {
        let check = false;
        const director = await this.directorModel.findOne({
            where: { unique_id: createRoleUserDto.user_unique_id },
        });
        if (director)
            check = true;
        if (!check) {
            throw new common_1.BadRequestException('There is no such user ID');
        }
        const roleUser = await this.roleUserModel.create(createRoleUserDto);
        return roleUser;
    }
    async findAll() {
        const roleUsers = await this.roleUserModel.findAll();
        return roleUsers;
    }
    async findOne(id) {
        const roleUser = await this.roleUserModel.findByPk(id);
        if (!roleUser) {
            throw new common_1.NotFoundException(`RoleUser with ID #${id} not found`);
        }
        return roleUser;
    }
    async update(id, updateRoleUserDto) {
        const roleUser = await this.findOne(id);
        await roleUser.update(updateRoleUserDto);
        return roleUser;
    }
    async remove(id) {
        const roleUser = await this.findOne(id);
        await roleUser.destroy();
    }
};
exports.RoleUserService = RoleUserService;
exports.RoleUserService = RoleUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_user_model_1.RoleUser)),
    __param(1, (0, sequelize_1.InjectModel)(director_model_copy_1.Director)),
    __metadata("design:paramtypes", [Object, Object])
], RoleUserService);
//# sourceMappingURL=role_user.service.js.map