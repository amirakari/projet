import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandeEntity } from './entities/commande.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommandeDto } from './DTO/Add-commande.dto';
import { UpdateCommandeDto } from './DTO/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(CommandeEntity)
    private userRepository: Repository<CommandeEntity>,
  ) {}
  async getUsers(): Promise<CommandeEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(user: AddCommandeDto): Promise<CommandeEntity> {
    return await this.userRepository.save(user);
  }
  async findById(id: number) {
    const utilisateur = await this.userRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    return utilisateur;
  }
  async updateCv(id: number, user: UpdateCommandeDto): Promise<CommandeEntity> {
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
