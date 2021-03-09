import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentaireEntity } from './entities/commentaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommentaireDto } from './DTO/Add-commentaire.dto';
import { UpdateAbonnementDto } from '../abonnement/DTO/update-abonnement.dto';
import { UpdateCommentaireDto } from './DTO/update-commentaire.dto';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(CommentaireEntity)
    private userRepository: Repository<CommentaireEntity>,
  ) {}
  async getUsers(): Promise<CommentaireEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(user: AddCommentaireDto): Promise<CommentaireEntity> {
    return await this.userRepository.save(user);
  }
  async findById(id: number) {
    const utilisateur = await this.userRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    return utilisateur;
  }
  async updateCv(
    id: number,
    user: UpdateCommentaireDto,
  ): Promise<CommentaireEntity> {
    const newUser = await this.userRepository.preload({
      id,
      ...user,
    });
    if (!newUser) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.userRepository.save(newUser);
  }
  async softDeleteUser(id: number) {
    return this.userRepository.softDelete(id);
  }
  async restoreUtilisateur(id: number) {
    this.userRepository.restore(id);
  }
}
