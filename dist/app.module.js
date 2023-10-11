"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const director_module_1 = require("./director/director.module");
const uniqueID_module_1 = require("./uniqueID/uniqueID.module");
const uniqueID_model_1 = require("./uniqueID/models/uniqueID.model");
const director_model_copy_1 = require("./director/model/director.model copy");
const role_module_1 = require("./role/role.module");
const role_user_module_1 = require("./role_user/role_user.module");
const director_google_model_1 = require("./director/model/director-google.model");
const passport_1 = require("@nestjs/passport");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [director_model_copy_1.Director, uniqueID_model_1.UniqueID, director_google_model_1.UserGoogle],
                autoLoadModels: true,
                logging: false,
            }),
            director_module_1.DirectorModule,
            uniqueID_module_1.UniqueIDModule,
            role_module_1.RoleModule,
            role_user_module_1.RoleUserModule,
            passport_1.PassportModule.register({ session: true }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map