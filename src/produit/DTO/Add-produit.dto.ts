import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddProduitDto {
  @IsNotEmpty()
  @IsString()
  categorie: string;
  @IsNotEmpty()
  @IsString()
  nom: string;
  @IsNotEmpty()
  @IsString()
  reference: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  codeabare: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  prixsansremise: number;
  @IsNotEmpty()
  @IsDate()
  DLC: Date;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  prixavecremise: number;
}
