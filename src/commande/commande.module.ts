import { Module } from '@nestjs/common';
import { CommandeController } from './commande.controller';
import { CommandeService } from './commande.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeEntity } from './entities/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommandeEntity])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
