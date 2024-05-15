import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';
import { ImagesController } from '../../functions/storage/images.controller';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common/exceptions';

@ApiTags('Noticias')
@Controller('news')
// export class NewsController {
//   constructor(private readonly newsService: NewsService) {}
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly imagesController: ImagesController,
  ) {}


  @Get()
  @ApiOperation({
    summary: 'Obtener todas las noticias',
    description: 'Esta ruta devuelve todas las noticias registradas',
  })
  getAllNews(): Promise<News[]> {
    console.log("ENTRASTE AL GET")
    return this.newsService.getAllNews();
  }

  @Get(':title')
  @ApiOperation({
    summary: 'Obtener una noticia por ID',
    description:
      'Esta ruta devuelve una noticia registrada por un id de tipo uuid enviado por parámetro',
  })
  getOneNews(@Param('title') title: string): Promise<News> {
    return this.newsService.getOneNews(title);
  }

  @Post('')
@ApiOperation({
  summary: 'Crear una nueva noticia (solo para administradores)',
  description: 'Esta ruta crea una nueva noticia con los datos enviados por body',
})
@UseInterceptors(FilesInterceptor('files', 3)) 
async createNews(@Body() news: NewsDto, @UploadedFiles() files: Express.Multer.File[]) {
  console.log("ENTRASTE AL POST")
  
  if (files.length < 1) {
    throw new BadRequestException('Debe cargarse al menos una imagen');
  }

  const uploadedImages = await Promise.all(files.map(file => this.imagesController.uploadImage(file)));
  [news.primaryImage, news.secondaryImage, news.tertiaryImage] = uploadedImages.map(image => image.url);

  // Validación manual del DTO
  const errors = await validate(news);
  if (errors.length > 0) {
    throw new BadRequestException('La validación falló');
  }

  return this.newsService.createNews(news);
}




  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una noticia (solo para administradores)',
    description:
      'Esta ruta elimina una noticia por un id de tipo uuid enviado por parámetro',
  })
  deleteNews(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.deleteNews(id);
  }
}
