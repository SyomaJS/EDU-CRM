import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDirectorDto {
  @ApiProperty({
    description: 'First name of the director',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the director',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Email of the director',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the director',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'Password of the director',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Director password',
  })
  @IsNotEmpty()
  director_password: string;
}
