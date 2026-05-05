import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdatePostDto } from './dto/updatePost.dto';


@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Post('create_post')
    @UseGuards(JwtGuard)                    // 👈 protect the route
    @ApiBearerAuth('access-token')   
    @ApiOperation({ summary: 'create a post' })
    @ApiResponse({ status: 201, description: 'post created successfully' })
    createPost(
        @Body() postDto: CreatePostDto,
        @GetUser('sub') userId: string
    ){
        return this.postService.createPost(postDto, userId)

    }
    @Put(':id')
    @UseGuards(JwtGuard)                    // 👈 protect the route
    @ApiBearerAuth('access-token')   
    @ApiOperation({ summary: 'create a post' })
    @ApiResponse({ status: 201, description: 'post updated successfully' })
    updatePost(
    @Param('id') postId: string,
    @Body() updatePost: UpdatePostDto,
    @GetUser('sub') userId: string

     ){
       return this.postService.updatePost(updatePost, userId, postId)
     }


}
