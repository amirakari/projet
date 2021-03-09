import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAbonnementDto {
  @IsOptional()
  @IsString()
  durée: string;
  @IsOptional()
  @IsString()
  status: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  prix: number;
}
