import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class createFolderDTO {
    // nom du dossier
    @ApiProperty({
        example: 'Authemtification',
        description: 'Nom du dossier',
        required: true,
        minLength: 3,
        maxLength: 22,
    })
    @IsString({ message: "Le nom du dossier doit etre une chaine de caracteres" })
    @IsNotEmpty({ message: "Le nom du dossier est obligatoire" })
    nom: string

    // la couleur du dossier
    @ApiProperty({
        example: "#ff34f6",
        description: "Couleur du dossier au format hexadécimal (incluant le #)",
        minLength: 7,
        maxLength: 7,
    })
    @IsString()
    @IsNotEmpty()
    @IsHexColor({ message: "La couleur doit être un format hexadécimal valide (ex: #ffffff)" })
    @Length(7, 7, { message: "La couleur doit comporter exactement 7 caractères" })
    couleur: string;
}