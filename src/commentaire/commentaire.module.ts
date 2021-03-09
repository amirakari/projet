import { Module } from '@nestjs/common';
import { CommentaireController } from './commentaire.controller';
import { CommentaireService } from './commentaire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaireEntity } from './entities/commentaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentaireEntity])],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
