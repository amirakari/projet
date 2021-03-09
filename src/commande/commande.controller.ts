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
import { CommandeService } from './commande.service';
import { CommandeEntity } from './entities/commande.entity';
import { AddCommandeDto } from './DTO/Add-commande.dto';
import { UpdateCommandeDto } from './DTO/update-commande.dto';

@Controller('commande')
export class CommandeController {
  constructor(private userService: CommandeService) {}
  @Get()
  async getAllcvs(): Promise<CommandeEntity[]> {
    return await this.userService.getUsers();
  }
  @Post()
  async addCv(@Body() addCvDto: AddCommandeDto): Promise<CommandeEntity> {
    return this.userService.addCv(addCvDto);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateUserDto: UpdateCommandeDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommandeEntity> {
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
