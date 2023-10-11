import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleUserAttr {
  id: number;
  role_id: number;
  user_unique_id: number;
}

@Table({ tableName: 'role_user' })
export class RoleUser extends Model<RoleUser, RoleUserAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  role_id: number;

  @Column({ type: DataType.INTEGER })
  user_unique_id: number;
}
