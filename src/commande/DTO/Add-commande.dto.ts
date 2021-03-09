import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddCommandeDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantite: number;
}
