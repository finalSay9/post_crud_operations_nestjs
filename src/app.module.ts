import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 makes process.env available everywhere in the app
    }),
    PrismaModule,
    AuthModule],
  
})
export class AppModule {}
