import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: String;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: String;
}