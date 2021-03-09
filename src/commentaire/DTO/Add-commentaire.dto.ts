import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddCommentaireDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  nbrelike: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  nbredislike: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  nbreemojis: number;
}
