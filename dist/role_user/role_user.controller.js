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
exports.RoleUserController = void 0;
const common_1 = require("@nestjs/common");
const role_user_service_1 = require("./role_user.service");
const create_role_user_dto_1 = require("./dto/create-role_user.dto");
const update_role_user_dto_1 = require("./dto/update-role_user.dto");
let RoleUserController = class RoleUserController {
    constructor(roleUserService) {
        this.roleUserService = roleUserService;
    }
    create(createRoleUserDto) {
        return this.roleUserService.create(createRoleUserDto);
    }
    findAll() {
        return this.roleUserService.findAll();
    }
    findOne(id) {
        return this.roleUserService.findOne(+id);
    }
    update(id, updateRoleUserDto) {
        return this.roleUserService.update(+id, updateRoleUserDto);
    }
    remove(id) {
        return this.roleUserService.remove(+id);
    }
};
exports.RoleUserController = RoleUserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_user_dto_1.CreateRoleUserDto]),
    __metadata("design:returntype", void 0)
], RoleUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_user_dto_1.UpdateRoleUserDto]),
    __metadata("design:returntype", void 0)
], RoleUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleUserController.prototype, "remove", null);
exports.RoleUserController = RoleUserController = __decorate([
    (0, common_1.Controller)('role-user'),
    __metadata("design:paramtypes", [role_user_service_1.RoleUserService])
], RoleUserController);
//# sourceMappingURL=role_user.controller.js.map