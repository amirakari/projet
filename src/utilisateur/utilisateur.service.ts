import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './DTO/Add-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtservice: JwtService,
  ) {}
  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(userData: AddUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `le username et le password doivent etre unique`,
      );
    }
    return user;
  }
  async findById(id: number) {
    const utilisateur = await this.userRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    return utilisateur;
  }
  async updateCv(id: number, user: UpdateUserDto): Promise<UserEntity> {
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
  async login(credentials: LoginCredentialsDto) {
    const { mail, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mail = :mail', { mail })
      .getOne();
    if (!user) throw new NotFoundException('username ou password éronnée');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        mail: user.mail,
        type: user.type,
      };
      const jwt = await this.jwtservice.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('username ou password éronné');
    }
  }
}
