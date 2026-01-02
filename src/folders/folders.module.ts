import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { PrismaService } from 'src/prisma.service';
import { FoldersController } from './folders.controller';

@Module({
  controllers : [FoldersController],
  providers: [FoldersService,PrismaService]
})
export class FoldersModule {}
