import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoutiqueEntity } from './entities/boutique.entity';
import { Repository } from 'typeorm';
import { AddBoutiqueDto } from './DTO/Add-boutique.dto';
import { UpdateBoutiqueDto } from './DTO/update-boutique.dto';
import { UserEntity } from '../utilisateur/entities/user.entity';
import { UserTypeEnum } from '../enums/user.type.enum';

@Injectable()
export class BoutiqueService {
  constructor(
    @InjectRepository(BoutiqueEntity)
    private boutiqueRepository: Repository<BoutiqueEntity>,
  ) {}
  async getBoutique(user): Promise<BoutiqueEntity[]> {
    if (user.type === UserTypeEnum.ADMIN)
      return await this.boutiqueRepository.find();
    return await this.boutiqueRepository.find({ user });
  }
  async addBoutique(boutique: AddBoutiqueDto, user): Promise<BoutiqueEntity> {
    const newBoutique = this.boutiqueRepository.create(boutique);
    newBoutique.user = user;
    return await this.boutiqueRepository.save(newBoutique);
  }
  async findById(id: number, user) {
    const utilisateur = await this.boutiqueRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    if (
      user.type === UserTypeEnum.ADMIN ||
      (utilisateur.user && utilisateur.user.id === user.id)
    )
      return utilisateur;
    else throw new UnauthorizedException();
  }
  async updateBoutique(
    id: number,
    boutique: UpdateBoutiqueDto,
    user,
  ): Promise<BoutiqueEntity> {
    const newUser = await this.boutiqueRepository.preload({
      id,
      ...boutique,
    });
    if (!newUser) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    if (
      user.type === UserTypeEnum.ADMIN ||
      (newUser.user && newUser.user.id === user.id)
    )
      return await this.boutiqueRepository.save(newUser);
    else throw new UnauthorizedException();
  }
  async softDeleteBoutique(id: number, user) {
    const newUser = await this.boutiqueRepository.findOne(id);
    if (
      user.type === UserTypeEnum.ADMIN ||
      (newUser.user && newUser.user.id === user.id)
    )
      return this.boutiqueRepository.softDelete(id);
    else return new UnauthorizedException();
  }
  async restoreUtilisateur(id: number, user) {
    const newUser = await this.boutiqueRepository.query(
      'select  * from boutique where id = ?',
      [id],
    );
    console.log(newUser);
    if (!newUser) {
      throw new NotFoundException();
    }
    if (
      user.type === UserTypeEnum.ADMIN ||
      (newUser.user && newUser.user.id === user.id)
    )
      return this.boutiqueRepository.restore(id);
    else return new UnauthorizedException();
  }
}
