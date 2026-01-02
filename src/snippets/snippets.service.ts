import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSnippetDto } from './dto/createSnippet.dto';
import { UpdateSnippetDto } from './dto/updateSnippet.dto';

@Injectable()
export class SnippetsService {
    constructor(private readonly prisma: PrismaService) {}
    async getSnippets(userId: number) {
        const snippets = await this.prisma.snippet.findMany({
            where: {
                utilisateurId: userId,
            },
        });

        if (snippets.length === 0){
            return {
                status: true,
                message:"l'utilisateur n'a pas encore de snippet"
            }
        }

        return {
            status: true,
            message: "liste des snippets de l'utilisateur",
            data: snippets,
        };
    }

    async getOneSnippet(userId: number,snippetId: number) {
        const snippet = await this.prisma.snippet.findUnique({
            where: {
                id: snippetId,
                utilisateurId: userId
            },
        });
        if (!snippet) {
            throw new NotFoundException("Snippet non trouvé");
        }
        return {
            status: true,
            message: "un snippet de l'utilisateur",
            data: snippet,
        };
    }

    async addSnippet(userId: number, data: CreateSnippetDto) {
        const existingSnippet = await this.prisma.snippet.findFirst({
            where: {
                titre: data.titre,
                utilisateurId: userId,
            },
        })
        if (existingSnippet) {
            throw new BadRequestException("un snippet avec ce titre existe deja");
        }
        const snippet = await this.prisma.snippet.create({
            data: {
                titre: data.titre,
                description: data.description,
                code: data.code,
                langage: data.langage,
                utilisateurId: userId,
            },
        });
        return {
            status: true,
            message: "snippet cree avec succes",
            data: snippet,
        };
    }

    async updateSnippet(userId: number, snippetId: number, data: UpdateSnippetDto){
        const snippet = await this.prisma.snippet.findUnique({
            where: {
                id: snippetId,
                utilisateurId: userId,
            },
        });
        if (!snippet) {
            throw new NotFoundException("Snippet non trouve");
        }
        const updatedSnippet = await this.prisma.snippet.update({
            where: {
                id: snippetId,
            },
            data: {
                titre: data.titre,
                description: data.description,
                code: data.code,
                isFavorite: data.isFavorite,
                dossierId: data.dossierId,
                langage: data.langage,
            },
        });
        return {
            status: true,
            message: "snippet modifie avec succes",
            data: updatedSnippet,
        };
    }

    async deleteSnippet(userId: number, snippetId: number) {
        const snippet = await this.prisma.snippet.findUnique({
            where: {
                id: snippetId,
                utilisateurId: userId,
            },
        });
        if (!snippet) {
            throw new NotFoundException("Snippet non trouve");
        }
        await this.prisma.snippet.delete({
            where: {
                id: snippetId,
            },
        });
        return {
            status: true,
            message: "snippet supprime avec succes",
        };
    }

    async getSnippetsByFolder(userId: number, folderId: number) {
        const snippets = await this.prisma.snippet.findMany({
            where: {
                utilisateurId: userId,
                dossierId: folderId,
            },
        });
        // if(!snippets){
        //     throw new NotFoundException("aucun snippet trouve");
        // }
        return {
            status: true,
            message: "liste des snippets de l'utilisateur",
            data: snippets,
        };
    }

    async searchSnippets(userId: number, query: string) {
        const snippets = await this.prisma.snippet.findMany({
            where: {
                utilisateurId: userId,
                OR: [
                        {
                          titre: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                        {
                          code: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                        {
                          description: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                    ],
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            status: true,
            message: "Liste des snippets de l'utilisateur",
            data: snippets,
        };
    }

    // recherche de snippet dans un dossier
    async searchSnippetsInFolder(userId: number, folderId: number, query: string) {
        const snippets = await this.prisma.snippet.findMany({
            where: {
                utilisateurId: userId,
                dossierId: folderId,
                OR: [
                        {
                          titre: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                        {
                          code: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                        {
                          description: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                    ],
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
        return {
            status: true,
            message: "Liste des snippets de l'utilisateur",
            data: snippets,
        };
    }

    //nombre total de snippet
    async countSnippets() {
        const count = await this.prisma.snippet.count({
        });
        return {
            status: true,
            message: "nombre total de snippet",
            data: count,
        };
    }

    //liste de tous les snippet
    async getAllSnippets() {
        const snippets = await this.prisma.snippet.findMany({
        });
        return {
            status: true,
            message: "liste des snippets",
            data: snippets,
        };
    }
}
