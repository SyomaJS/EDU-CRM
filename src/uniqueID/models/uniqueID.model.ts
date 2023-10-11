import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface uniqueIDAttr {
  unique_id: number;
}

@Table({ tableName: 'unique_id' })
export class UniqueID extends Model<uniqueIDAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  unique_id: number;
}
