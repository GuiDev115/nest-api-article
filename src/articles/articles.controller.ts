import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UrlTokenAuthGuard } from '../auth/guards/url-token-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // NOVO: Criar artigo com token na URL
  @UseGuards(UrlTokenAuthGuard)
  @Post('create-with-token')
  createWithToken(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user.userId);
  }

  // NOVO: Atualizar artigo com token na URL
  @UseGuards(UrlTokenAuthGuard)
  @Patch('update-with-token/:id')
  updateWithToken(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req) {
    return this.articlesService.update(+id, updateArticleDto, req.user.userId);
  }

  // NOVO: Deletar artigo com token na URL
  @UseGuards(UrlTokenAuthGuard)
  @Delete('delete-with-token/:id')
  removeWithToken(@Param('id') id: string, @Request() req) {
    return this.articlesService.remove(+id, req.user.userId);
  }

  // NOVO: Meus artigos com token na URL
  @UseGuards(UrlTokenAuthGuard)
  @Get('my-articles-with-token')
  findMyArticlesWithToken(@Request() req) {
    return this.articlesService.findByAuthor(req.user.userId);
  }

  // Manter os endpoints originais também (com header Authorization)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req) {
    return this.articlesService.update(+id, updateArticleDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.articlesService.remove(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/articles')
  findMyArticles(@Request() req) {
    return this.articlesService.findByAuthor(req.user.userId);
  }
}