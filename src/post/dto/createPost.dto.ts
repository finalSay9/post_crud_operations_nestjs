import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({example: "evan chimwaza", description: "name of the user"})
    @IsString()
    @MinLength(2)
    title: string;

    @ApiProperty({example: "evan chimwaza", description: "name of the user"})
    @IsString()
    @MinLength(2)
    content: string;
    
}