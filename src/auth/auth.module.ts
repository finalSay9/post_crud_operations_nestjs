import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
 imports:[
  JwtModule.register(
    {
      secrete: process.env.JWT_SECRET
    }
  )
 ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
