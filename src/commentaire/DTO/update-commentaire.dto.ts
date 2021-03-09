import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentaireDto {
  @IsOptional()
  @IsString()
  message: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbrelike: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbredislike: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbreemojis: number;
}
