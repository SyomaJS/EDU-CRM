import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRoleUserDto {
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @IsInt()
  @IsNotEmpty()
  user_unique_id: number;
}
