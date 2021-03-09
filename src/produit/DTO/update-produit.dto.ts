import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProduitDto {
  @IsOptional()
  @IsString()
  categorie: string;
  @IsOptional()
  @IsString()
  nom: string;
  @IsOptional()
  @IsString()
  reference: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  codeabare: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  prixsansremise: number;
  @IsOptional()
  @IsDate()
  DLC: Date;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  prixavecremise: number;
}
