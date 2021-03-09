import { Injectable, NotFoundException } from '@nestjs/common';
import { AbonnementEntity } from './entities/abonnement.entity';
import { UpdateAbonnementDto } from './DTO/update-abonnement.dto';
import { AddAbonnementDto } from './DTO/Add-abonnement.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AbonnementService {
  constructor(
    @InjectRepository(AbonnementEntity)
    private userRepository: Repository<AbonnementEntity>,
  ) {}
  async getUsers(): Promise<AbonnementEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(user: AddAbonnementDto): Promise<AbonnementEntity> {
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
    user: UpdateAbonnementDto,
  ): Promise<AbonnementEntity> {
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
