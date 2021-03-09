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
import { ProduitService } from './produit.service';
import { ProduitEntity } from './entities/produit.entity';
import { AddProduitDto } from './DTO/Add-produit.dto';
import { UpdateProduitDto } from './DTO/update-produit.dto';

@Controller('produit')
export class ProduitController {
  constructor(private userService: ProduitService) {}
  @Get()
  async getAllcvs(): Promise<ProduitEntity[]> {
    return await this.userService.getUsers();
  }
  @Post()
  async addCv(@Body() addCvDto: AddProduitDto): Promise<ProduitEntity> {
    return this.userService.addCv(addCvDto);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateUserDto: UpdateProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProduitEntity> {
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
