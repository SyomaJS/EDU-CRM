import { Column, Table, DataType, Model } from 'sequelize-typescript';

interface DirectorAttr {
  id: number;
  unique_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hashed_password: string;
  hashed_token: string;
}

@Table({ tableName: 'director' })
export class Director extends Model<Director, DirectorAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  unique_id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  hashed_token: string;
}
