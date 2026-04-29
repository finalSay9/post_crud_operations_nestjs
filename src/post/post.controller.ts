import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';


@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Post('create_post')
    @ApiOperation({ summary: 'create a post' })
    @ApiResponse({ status: 201, description: 'post created successfully' })
    createPost(@Body() postDto: CreatePostDto){
        return this.postService.createPost(postDto)

    }

}
