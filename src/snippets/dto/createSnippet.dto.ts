import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateSnippetDto {
    @ApiProperty({
        example: 'Authemtification',
        description: 'titre du snippet',
        required: true,
        minLength: 3,
        maxLength: 25,
    })
    @IsNotEmpty({ message: "Le titre du snippet est obligatoire" })
    @IsString({ message: "Le titre du snippet doit etre une chaine de caracteres" })
    titre: string;

    @ApiProperty({
        example: 'detail du snippet',
        description: 'description du snippet',
        required: false,
        minLength: 3,
    })
    @IsString({ message: "La description du snippet doit etre une chaine de caracteres" })
    description?: string;

    @ApiProperty({
        example: 'print("hello world")',
        description: 'snippet',
        required: true,
        minLength: 3,
    })
    @IsNotEmpty({ message: "Le snippet est obligatoire" })
    @IsString({ message: "Le snippet doit etre une chaine de caracteres" })
    code: string;

    @ApiProperty({
        example: 'python',
        description: 'langage du snippet',
        required: true,
        minLength: 3,
    })
    @IsNotEmpty({ message: "Le langage du snippet est obligatoire" })
    @IsString({ message: "Le langage du snippet doit etre une chaine de caracteres" })
    langage: string;

    @ApiProperty({
        example: 1,
        description: 'id du dossier',
        required: false,
    })
    dossierId?: number;
}