import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createFolderDTO } from './dto/createFolder.dto';
import { updateFolderDTO } from './dto/updateFolder.dto';

@Injectable()
export class FoldersService {
    constructor(private readonly prisma:PrismaService){}

    async getFolders(userId: number){
        const folders = await this.prisma.folder.findMany({
            where : {userId: userId},
            select: {
                id: true,
                nom: true,
                couleur: true,
            }
        })
        if (folders.length === 0){
            return {
                status: true,
                message:"l'utilisateur n'a pas encore de dossier"
            }
        }
        return{
            status: true,
            message: "liste des dossiers de l'utilisateur",
            data: folders
        }
    }

    async getOneFolder(userId: number,folderId: number){
        const folder = await this.prisma.folder.findUnique({
            where:{id: folderId},
            select:{
                id: true,
                nom: true,
                couleur: true,
                userId:true
            }
        })
        if(!folder) {
            throw new NotFoundException("Dossier non trouvé")
        }
        if(folderId !== userId) {
            throw new ForbiddenException("Vous n'avez pas accès à ce dossier")
        }
        
        return{
            status: true,
            message: "un dossier de l'utilisateur",
            data: folder
        }

    }

    async addFolder(userId: number, data:createFolderDTO) {
        const existingFolder = await this.prisma.folder.findFirst({
            where:{
                nom: data.nom,
                userId
            }
        })
        if(existingFolder){
            throw new BadRequestException("un dossier avec ce nom existe dejà");
        }
        const folder = await this.prisma.folder.create({
            data:{
                nom: data.nom,
                couleur:data.couleur,
                userId: userId
            }
        })
        return{
            status: true,
            message: "dossier cree avec succes",
            data: folder
        }
    }

    async updateFolder(userId: number, folderId: number, data:updateFolderDTO){
        const existingFolder = await this.prisma.folder.findFirst({
            where:{
                id: folderId,
                userId
            }
        })
        if(!existingFolder){
            throw new BadRequestException("aucun dossier trouvé avec cet ID");
        }
        const folder = await this.prisma.folder.update({
            where:{
                id: folderId
            },
            data:{
                nom: data.nom,
                couleur:data.couleur,
            },
            select:{
                id:true,
                nom: true,
                couleur:true,
            }
        })
        return{
            status: true,
            message: "dossier modifie avec succes",
            data: folder
        }
    }

    async deleteFolder(userId: number, folderId: number){
        const existingFolder = await this.prisma.folder.findFirst({
            where:{
                id: folderId,
                userId
            }
        })
        if(!existingFolder){
            throw new BadRequestException("aucun dossier trouve avec cet ID");
        }
        await this.prisma.folder.delete({
            where: {
                id: folderId
            }
        })
        return{
            status: true,
            message: "dossier supprime avec succes"
        }
    }
}
