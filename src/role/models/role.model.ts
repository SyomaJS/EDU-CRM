import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleAttr {
  id: number;
  role: string;
  description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  role: string;

  @Column({ type: DataType.STRING })
  description: string;
}
