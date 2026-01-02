import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class registerDto {
// username
    @ApiProperty({
        example: 'Jean Emmanuel',
        description: 'Nom de l\'utilisateur',
        required: true,
        minLength: 3,
        maxLength: 25,
    })
    @IsString({ message: "Le nom d'utilisateur doit etre une chaine de caracteres" })
    @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
    nomUtilisateur: string;

// email
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Email de l\'utilisateur',
        required: true,
    })
    @IsString({ message: 'L\'email doit etre une chaine de caracteres' })
    @IsNotEmpty({ message: 'L\'email est obligatoire' })
    @IsEmail({
        blacklisted_chars: "/,?{}[]#$%^&*()",
    }, { message: 'L\'email doit etre un email valide' })
    email: string;

// password
    @ApiProperty({
        example: 'password123',
        description: 'Mot de passe de l\'utilisateur',
        required: true,
        minLength: 8,
        maxLength: 50,
    })
    @IsString({ message: 'Le mot de passe doit etre une chaine de caracteres' })
    @IsNotEmpty({ message: "Le mot de passe est obligatoire"})
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caracteres' })
    password: string;
}