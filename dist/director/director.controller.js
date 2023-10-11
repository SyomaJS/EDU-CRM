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
exports.DirectorController = void 0;
const common_1 = require("@nestjs/common");
const director_service_1 = require("./director.service");
const login_director_dto_1 = require("./dto/login-director.dto");
const create_director_dto_1 = require("./dto/create-director.dto");
const google_director_guard_1 = require("../guards/google-director.guard");
const swagger_1 = require("@nestjs/swagger");
const forget_password_dto_1 = require("./dto/forget-password.dto");
let DirectorController = class DirectorController {
    constructor(directorService) {
        this.directorService = directorService;
    }
    register(createDirectorDto, res) {
        return this.directorService.createDirector(createDirectorDto, res);
    }
    login(loginDirectorDto, res) {
        return this.directorService.login(loginDirectorDto, res);
    }
    handleLogin() {
        return { msg: 'Google Login Ok' };
    }
    async handleRedirect(req, res) {
        const result = await this.directorService.getTokenForGoogleUser(req, res);
        return res.json(result);
    }
    changePassword(changePassDto) {
        return this.directorService.changePassword(changePassDto);
    }
};
exports.DirectorController = DirectorController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация директора' }),
    (0, swagger_1.ApiBody)({ type: create_director_dto_1.CreateDirectorDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_director_dto_1.CreateDirectorDto, Object]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Вход для директора' }),
    (0, swagger_1.ApiBody)({ type: login_director_dto_1.LoginDirectorDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_director_dto_1.LoginDirectorDto, Object]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(google_director_guard_1.GoogleAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Вход с помощью Google' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(google_director_guard_1.GoogleAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Редирект после входа через Google' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Post)('forget/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ChangePassDto]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "changePassword", null);
exports.DirectorController = DirectorController = __decorate([
    (0, swagger_1.ApiTags)('Directors'),
    (0, common_1.Controller)('director'),
    __metadata("design:paramtypes", [director_service_1.DirectorService])
], DirectorController);
//# sourceMappingURL=director.controller.js.map