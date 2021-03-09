import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommandeDto {
  @IsOptional()
  @IsDate()
  date: Date;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantite: number;
}
