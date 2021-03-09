import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueEntity } from './entities/boutique.entity';
import { AddBoutiqueDto } from './DTO/Add-boutique.dto';
import { UpdateBoutiqueDto } from './DTO/update-boutique.dto';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../decorators/user.decorator';
@Controller('boutique')
export class BoutiqueController {
  constructor(private boutiqueService: BoutiqueService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllcvs(@User() user): Promise<BoutiqueEntity[]> {
    return await this.boutiqueService.getBoutique(user);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() addCvDto: AddBoutiqueDto,
    @Req() request: Request,
  ): Promise<BoutiqueEntity> {
    const user = request.user;
    return this.boutiqueService.addBoutique(addCvDto, user);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateUserDto: UpdateBoutiqueDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ): Promise<BoutiqueEntity> {
    return await this.boutiqueService.updateBoutique(id, updateUserDto, user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.boutiqueService.softDeleteBoutique(id, user);
  }
  @Get('/recover/:id')
  @UseGuards(JwtAuthGuard)
  async recoverUtilisateur(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ) {
    this.boutiqueService.restoreUtilisateur(id, user);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBoutique(
    @Param('id', ParseIntPipe) id,
    @User() user,
  ): Promise<BoutiqueEntity> {
    return this.boutiqueService.findById(id, user);
  }
}
