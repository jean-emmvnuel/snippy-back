import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { PrismaService } from 'src/prisma.service';
import { FoldersController } from './folders.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers : [FoldersController],
  providers: [FoldersService,PrismaService,JwtStrategy]
})
export class FoldersModule {}
