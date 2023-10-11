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
exports.DirectorService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const uniqueID_service_1 = require("../uniqueID/uniqueID.service");
const director_model_copy_1 = require("./model/director.model copy");
const director_google_model_1 = require("./model/director-google.model");
let DirectorService = class DirectorService {
    constructor(directorModel, userModel, jwtService, uniqueIdService) {
        this.directorModel = directorModel;
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.uniqueIdService = uniqueIdService;
    }
    async validateUser(details) {
        const user = await this.directorModel.findOne({
            where: { email: details.email },
        });
        if (user)
            return user;
        throw new common_1.UnauthorizedException('You must be admin ');
    }
    async createDirector(createDirectorDto, res) {
        try {
            if (createDirectorDto.director_password != process.env.DIRECTOR_PASSWORD) {
                throw new common_1.ForbiddenException('Wrong director password');
            }
            const checkEmail = await this.directorModel.findOne({
                where: { email: createDirectorDto.email },
            });
            if (checkEmail) {
                throw new common_1.BadRequestException('Director with such email already exists');
            }
            const uniqueID = Number(await this.uniqueIdService.generateID());
            const director = await this.directorModel.create({
                ...createDirectorDto,
                hashed_password: await bcrypt.hash(createDirectorDto.password, 7),
                unique_id: uniqueID,
            });
            const tokens = await this.getTokens(director);
            director.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
            res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return director.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async login({ phone_number, password }, res) {
        const director = await this.directorModel.findOne({
            where: { phone_number: phone_number },
        });
        if (!director) {
            throw new common_1.ForbiddenException('Phone number or password is incorrect ..');
        }
        const isValidPassword = await bcrypt.compare(password, director.hashed_password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Phone number or password is incorrect ..');
        }
        const tokens = await this.getTokens(director);
        const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updatedDirector = await this.directorModel.update({ hashed_token: hashed_token }, { where: { id: director.id }, returning: true });
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 21 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            msg: 'Director logged in',
            director: updatedDirector[1][0],
            tokens,
        };
        res.status(common_1.HttpStatus.OK).json(response);
    }
    async getTokenForGoogleUser(req, res) {
        const user = req.user;
        if (!user) {
            throw new common_1.UnauthorizedException('Unauthorized access ...');
        }
        const email = user?.dataValues?.email;
        if (!email) {
            throw new common_1.UnauthorizedException('Unauthorized access email...');
        }
        const director = await this.directorModel.findOne({
            where: { email: email },
        });
        if (!director) {
            throw new common_1.UnauthorizedException('There is no such a director');
        }
        const tokens = await this.getTokens(director);
        director.hashed_token = await bcrypt.hash(tokens.refresh_token, 8);
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 21 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return director;
    }
    async changePassword(changePassDto) {
        const director = await this.directorModel.findOne({
            where: { id: changePassDto.id },
        });
        if (!director)
            throw new common_1.NotFoundException('There is no user with such id');
        const isTheSame = bcrypt.compare(changePassDto.old_password, director.hashed_password);
        if (!isTheSame)
            throw new common_1.BadRequestException('Wrong old password ...');
        director.hashed_password = await bcrypt.hash(changePassDto.new_password, 7);
        return await director.save();
    }
    async getTokens(director) {
        const jwtPayload = {
            id: director.id,
            uniqueID: director.unique_id,
            email: director.email,
            role: 'DIRECTOR',
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
exports.DirectorService = DirectorService;
exports.DirectorService = DirectorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(director_model_copy_1.Director)),
    __param(1, (0, sequelize_1.InjectModel)(director_google_model_1.UserGoogle)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        uniqueID_service_1.UniqueIDService])
], DirectorService);
//# sourceMappingURL=director.service.js.map