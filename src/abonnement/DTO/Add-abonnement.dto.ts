import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddAbonnementDto {
  @IsNotEmpty()
  @IsString()
  durée: string;
  @IsNotEmpty()
  @IsString()
  status: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  prix: number;
}
