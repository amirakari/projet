import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { AbonnementEntity } from './entities/abonnement.entity';
import { AddAbonnementDto } from './DTO/Add-abonnement.dto';
import { UpdateAbonnementDto } from './DTO/update-abonnement.dto';

@Controller('abonnement')
export class AbonnementController {
  constructor(private userService: AbonnementService) {}
  @Get()
  async getAllcvs(): Promise<AbonnementEntity[]> {
    return await this.userService.getUsers();
  }
  @Post()
  async addCv(@Body() addCvDto: AddAbonnementDto): Promise<AbonnementEntity> {
    return this.userService.addCv(addCvDto);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateUserDto: UpdateAbonnementDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AbonnementEntity> {
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
