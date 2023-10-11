import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePassDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;
}
