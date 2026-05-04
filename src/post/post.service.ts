import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
       
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
    //update post
    async updatePost(updateDto: UpdatePostDto, userId: string, postId: string){
        //find the post first
        const post = await this.prisma.post.findUnique({
            where: {id: postId}
        });
        //if post dosent exist
        
        const updatePost = await this.prisma.post.create({
            data: {
                title: updateDto.title,
                content: updateDto.content,
                userId: userId,
                postId: postId
            }
        });
        return {
            message: "updated successfully",
            updatePost
        }
    }
}
