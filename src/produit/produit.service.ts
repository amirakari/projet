import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitEntity } from './entities/produit.entity';
import { Repository } from 'typeorm';
import { AddProduitDto } from './DTO/Add-produit.dto';
import { UpdateProduitDto } from './DTO/update-produit.dto';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private userRepository: Repository<ProduitEntity>,
  ) {}
  async getUsers(): Promise<ProduitEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(user: AddProduitDto): Promise<ProduitEntity> {
    return await this.userRepository.save(user);
  }
  async findById(id: number) {
    const utilisateur = await this.userRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    return utilisateur;
  }
  async updateCv(id: number, user: UpdateProduitDto): Promise<ProduitEntity> {
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
