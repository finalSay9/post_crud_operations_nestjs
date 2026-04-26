// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 2. hash the password — never store plain text passwords
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. create the user in the database
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // 4. sign a JWT token
    const token = await this.signToken(user.id, user.email);

    // 5. return token — never return the password
    return {
      message: 'Registration successful',
      access_token: token,
    };
  }

  async login(dto: LoginDto) {
    // 1. find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2. if no user found, throw — don't reveal whether email exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. compare submitted password against hashed password
    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. sign and return JWT token
    const token = await this.signToken(user.id, user.email);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }

  // private helper — only used inside AuthService
  private async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };

    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d', // token expires in 7 days
    });
  }
}
