import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDirectorDto {
  @ApiProperty({
    description: 'Phone number of the director',
  })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Password of the director',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
