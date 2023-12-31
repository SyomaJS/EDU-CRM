"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserModule = void 0;
const common_1 = require("@nestjs/common");
const role_user_service_1 = require("./role_user.service");
const role_user_controller_1 = require("./role_user.controller");
const sequelize_1 = require("@nestjs/sequelize");
const role_user_model_1 = require("./models/role_user.model");
const director_module_1 = require("../director/director.module");
const director_model_copy_1 = require("../director/model/director.model copy");
let RoleUserModule = class RoleUserModule {
};
exports.RoleUserModule = RoleUserModule;
exports.RoleUserModule = RoleUserModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([role_user_model_1.RoleUser, director_model_copy_1.Director]), director_module_1.DirectorModule],
        controllers: [role_user_controller_1.RoleUserController],
        providers: [role_user_service_1.RoleUserService],
        exports: [role_user_service_1.RoleUserService],
    })
], RoleUserModule);
//# sourceMappingURL=role_user.module.js.map