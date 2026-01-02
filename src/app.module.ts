import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FoldersController } from './folders/folders.controller';
import { FoldersModule } from './folders/folders.module';
import { SnippetsService } from './snippets/snippets.service';
import { SnippetsController } from './snippets/snippets.controller';
import { SnippetsModule } from './snippets/snippets.module';


@Module({
  imports: [AuthModule, FoldersModule, SnippetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
