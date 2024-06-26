import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';

import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { StorageService } from 'src/modules/storage/storage.service';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Patrocinadores')
@Controller('sponsor')
export class SponsorController {
  constructor(
    private readonly sponsorService: SponsorService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los patrocinadores',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de patrocinadores y total es la cantidad de patrocinadores registrados en la base de datos',
  })
  getAllSponsors(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Sponsor[]; total: number }> {
    return this.sponsorService.getAllSponsors(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un patrocinador por ID',
    description:
      'Esta ruta devuelve un patrocinador registrado por un id de tipo uuid enviado por parámetro',
  })
  getOneSponsor(@Param('id', ParseUUIDPipe) id: string): Promise<Sponsor> {
    return this.sponsorService.getOneSponsor(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear un nuevo patrocinador (solo para administradores)',
    description:
      'Esta ruta crea un nuevo patrocinador con los datos enviados por body',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(FileInterceptor('files'))
  async reateSponsor(
    @Body() sponsor: SponsorDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Sponsor> {
    const uploadedImage = await this.storageService.uploadImage(file);

    sponsor.logo = uploadedImage;
    const errors = await validate(sponsor);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }

    return this.sponsorService.createSponsor(sponsor);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un patrocinador (solo para administradores)',
    description:
      'Esta ruta elimina un patrocinador por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  deleteSponsor(@Param('id', ParseUUIDPipe) id: string) {
    return this.sponsorService.deleteSponsor(id);
  }
}
