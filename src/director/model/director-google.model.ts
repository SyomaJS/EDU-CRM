import { Column, Table, DataType, Model } from 'sequelize-typescript';

interface UserGoogleAttr {
  id: number;
  email: string;
  displayName: string;
}

@Table({ tableName: 'user-google' })
export class UserGoogle extends Model<UserGoogle, UserGoogleAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  displayName: string;
}
