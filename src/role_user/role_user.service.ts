import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CreateRoleUserDto } from './dto/create-role_user.dto';
import { UpdateRoleUserDto } from './dto/update-role_user.dto';
import { RoleUser } from './models/role_user.model';
import { Director } from '../director/model/director.model copy';

@Injectable()
export class RoleUserService {
  constructor(
    @InjectModel(RoleUser)
    private readonly roleUserModel: ModelCtor<RoleUser>,

    @InjectModel(Director)
    private readonly directorModel: typeof Director,
  ) {}

  async create(createRoleUserDto: CreateRoleUserDto): Promise<RoleUser> {
    // In order to check if there is such a user ID
    let check: boolean = false;

    //*  < Check is there director >  *//
    const director = await this.directorModel.findOne({
      where: { unique_id: createRoleUserDto.user_unique_id },
    });
    if (director) check = true;
    //*  < Check is there director />  *//

    if (!check) {
      throw new BadRequestException('There is no such user ID');
    }

    const roleUser = await this.roleUserModel.create(createRoleUserDto);
    return roleUser;
  }

  async findAll(): Promise<RoleUser[]> {
    const roleUsers = await this.roleUserModel.findAll();
    return roleUsers;
  }

  async findOne(id: number): Promise<RoleUser> {
    const roleUser = await this.roleUserModel.findByPk(id);

    if (!roleUser) {
      throw new NotFoundException(`RoleUser with ID #${id} not found`);
    }

    return roleUser;
  }

  async update(
    id: number,
    updateRoleUserDto: UpdateRoleUserDto,
  ): Promise<RoleUser> {
    const roleUser = await this.findOne(id);

    await roleUser.update(updateRoleUserDto);

    return roleUser;
  }

  async remove(id: number): Promise<void> {
    const roleUser = await this.findOne(id);

    await roleUser.destroy();
  }
}
