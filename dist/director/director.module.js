"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectorModule = void 0;
const common_1 = require("@nestjs/common");
const director_service_1 = require("./director.service");
const director_controller_1 = require("./director.controller");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const uniqueID_module_1 = require("../uniqueID/uniqueID.module");
const GoogleStrategy_1 = require("./utils/GoogleStrategy");
const director_model_copy_1 = require("./model/director.model copy");
const director_google_model_1 = require("./model/director-google.model");
const Serializer_director_1 = require("./utils/Serializer.director");
let DirectorModule = class DirectorModule {
};
exports.DirectorModule = DirectorModule;
exports.DirectorModule = DirectorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([director_model_copy_1.Director, director_google_model_1.UserGoogle]),
            jwt_1.JwtModule.register({}),
            uniqueID_module_1.UniqueIDModule,
        ],
        controllers: [director_controller_1.DirectorController],
        providers: [
            director_service_1.DirectorService,
            GoogleStrategy_1.GoogleStrategy,
            Serializer_director_1.SessionSerializer,
            {
                provide: 'DIRECTOR_SERVICE',
                useClass: director_service_1.DirectorService,
            },
        ],
        exports: [director_service_1.DirectorService],
    })
], DirectorModule);
//# sourceMappingURL=director.module.js.map