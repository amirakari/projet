import { Module } from '@nestjs/common';
import { ListefavorisController } from './listefavoris.controller';
import { ListefavorisService } from './listefavoris.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListefavorisEntity } from './entities/listefavoris.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListefavorisEntity])],
  controllers: [ListefavorisController],
  providers: [ListefavorisService],
})
export class ListefavorisModule {}
