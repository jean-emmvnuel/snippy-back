import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UpdateSnippetDto {
  @ApiPropertyOptional({
    example: 'Authentification',
    description: 'Titre du snippet',
    minLength: 3,
    maxLength: 25,
  })
  @IsOptional()
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le titre doit faire au moins 3 caractères' })
  titre?: string;

  @ApiPropertyOptional({
    example: 'Détail du snippet',
    description: 'Description du snippet',
    minLength: 3,
  })
  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description?: string;

  @ApiPropertyOptional({
    example: 'print("hello world")',
    description: 'Code du snippet',
    minLength: 3,
  })
  @IsOptional()
  @IsString({ message: 'Le code doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le code doit faire au moins 3 caractères' })
  code?: string;

  @ApiPropertyOptional({
    example: 'python',
    description: 'Langage du snippet',
    minLength: 3,
  })
  @IsOptional()
  @IsString({ message: 'Le langage doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le langage doit faire au moins 3 caractères' })
  langage?: string;

  @ApiPropertyOptional({
    example: 5,
    description: "ID du dossier (null pour aucun dossier)",
  })
  @IsOptional()
  @IsNumber({}, { message: "L'ID du dossier doit être un nombre" })
  dossierId?: number | null; // Autorise null si tu veux retirer du dossier

  @ApiPropertyOptional({
    example: true,
    description: 'Indique si le snippet est en favori',
  })
  @IsOptional()
  @IsBoolean({ message: 'isFavorite doit être un booléen' })
  isFavorite?: boolean;
}