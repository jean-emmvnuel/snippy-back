import { Controller, Get, UseGuards, Request, ParseIntPipe, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { createFolderDTO } from './dto/createFolder.dto';
import { updateFolderDTO } from './dto/updateFolder.dto';

@Controller('folders')
export class FoldersController {
    constructor(private readonly folderService: FoldersService) {}

    // recuperer tous les dossiers d'un utilisateur
    @UseGuards(JwtAuthGuard)
    @Get()
    async getFolder(@Request() req) {
        return this.folderService.getFolders(req.user.sub)
    }

    // recuperer un dossier specifique de l'utilisateur
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getOneFolder(@Request() req ,@Param('id', ParseIntPipe) id: number){
        return this.folderService.getOneFolder(req.user.sub,id)
    }

    // ajout d'un dossier 
    @UseGuards(JwtAuthGuard)
    @Post()
    async addFolder(@Request() req, @Body() data:createFolderDTO){
        return this.folderService.addFolder(req.user.sub,data)
    }

    // modifier un dossier specifique a un utilisateur
    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateFolder(@Request() req ,@Param('id', ParseIntPipe) id: number, @Body() data:updateFolderDTO){
        return this.folderService.updateFolder(req.user.sub, id, data)
    }

    // supprimer un dossier specifique a un utilisateur
    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async deleteFolder(@Request() req ,@Param('id', ParseIntPipe) id: number){
        return this.folderService.deleteFolder(req.user.sub, id)
    }
}
