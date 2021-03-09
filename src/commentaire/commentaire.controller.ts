import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireEntity } from './entities/commentaire.entity';
import { AddAbonnementDto } from '../abonnement/DTO/Add-abonnement.dto';
import { UpdateAbonnementDto } from '../abonnement/DTO/update-abonnement.dto';
import { AddCommentaireDto } from './DTO/Add-commentaire.dto';
import { UpdateCommentaireDto } from './DTO/update-commentaire.dto';

@Controller('commentaire')
export class CommentaireController {
  constructor(private userService: CommentaireService) {}
  @Get()
  async getAllcvs(): Promise<CommentaireEntity[]> {
    return await this.userService.getUsers();
  }
  @Post()
  async addCv(@Body() addCvDto: AddCommentaireDto): Promise<CommentaireEntity> {
    return this.userService.addCv(addCvDto);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateUserDto: UpdateCommentaireDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentaireEntity> {
    return await this.userService.updateCv(id, updateUserDto);
  }
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDeleteUser(id);
  }
  @Get('/recover/:id')
  async recoverUtilisateur(@Param('id', ParseIntPipe) id: number) {
    this.userService.restoreUtilisateur(id);
  }
}
