import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: ModelCtor<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleModel.create(createRoleDto);
    return role;
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.roleModel.findAll();
    return roles;
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);

    if (!role) {
      throw new NotFoundException(`Role with ID #${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    await role.update(updateRoleDto);

    return role;
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);

    await role.destroy();
  }
}
