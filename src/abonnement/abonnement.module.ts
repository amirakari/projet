import { Module } from '@nestjs/common';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementEntity } from './entities/abonnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbonnementEntity])],
  controllers: [AbonnementController],
  providers: [AbonnementService],
})
export class AbonnementModule {}
