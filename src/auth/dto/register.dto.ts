import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {
    @ApiProperty({example: "evan chimwaza", description: "name of the user"})
    @IsString()
    name: String;

    @ApiProperty({example: "evanchimwaza@gmail.com", description: "email of the user"})
    @IsEmail()
    email: String

    @ApiProperty({ example: 'password123', description: 'Minimum 8 characters' })
    @IsString()
    @MinLength(8)
    password: string;

}