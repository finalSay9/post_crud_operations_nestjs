import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';


@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}
}
