import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateSnippetDto } from './dto/createSnippet.dto';
import { UpdateSnippetDto } from './dto/updateSnippet.dto';

@Controller('snippets')
export class SnippetsController {
    constructor(private readonly snippetsService: SnippetsService) {}

    // recupere tous les snippets de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Get()
    getSnippets(@Request() req) {
        return this.snippetsService.getSnippets(req.user.sub);
    }

    // recupere un snippet de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOneSnippet(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.snippetsService.getOneSnippet(req.user.sub, id);
    }

    // ajoute un snippet de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Post()
    addSnippet(@Request() req, @Body() data: CreateSnippetDto) {
        return this.snippetsService.addSnippet(req.user.sub, data);
    }

    // met a jour un snippet de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    updateSnippet(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateSnippetDto) {
        return this.snippetsService.updateSnippet(req.user.sub, id, data);
    }


    // supprime un snippet de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteSnippet(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.snippetsService.deleteSnippet(req.user.sub, id);
    }

    // recupere tous les snippets de l'utilisateur par dossier
    @UseGuards(JwtAuthGuard)
    @Get('/folder/:id')
    getSnippetsByFolder(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.snippetsService.getSnippetsByFolder(req.user.sub, id);
    }

    // recupere tous les snippets de l'utilisateur par recherche
    @UseGuards(JwtAuthGuard)
    @Get('/search/:query')
    searchSnippets(@Request() req, @Param('query') query: string) {
        return this.snippetsService.searchSnippets(req.user.sub, query);
    }

    // recupere tous les snippets de l'utilisateur par recherche dans un dossier
    @UseGuards(JwtAuthGuard)
    @Get('/search/:folderId/:query')
    searchSnippetsInFolder(@Request() req, @Param('folderId', ParseIntPipe) folderId: number, @Param('query') query: string) {
        return this.snippetsService.searchSnippetsInFolder(req.user.sub, folderId, query);
    }
}
