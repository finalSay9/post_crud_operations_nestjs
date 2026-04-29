import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ){}

    async createPost(dto: CreatePostDto, authorId: string) {
        const post = await this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                authorId: authorId,
            },
        });

        return {
          message: 'post created successfully',
          post,
        };

    }
}
