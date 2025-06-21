import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto, authorId: number): Promise<Article> {
    const article = this.articlesRepository.create({
      ...createArticleDto,
      authorId,
    });

    return this.articlesRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find({
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!article) {
      throw new NotFoundException('Artigo não encontrado');
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number): Promise<Article> {
    const article = await this.findOne(id);

    if (article.authorId !== userId) {
      throw new ForbiddenException('Você só pode editar seus próprios artigos');
    }

    await this.articlesRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const article = await this.findOne(id);

    if (article.authorId !== userId) {
      throw new ForbiddenException('Você só pode deletar seus próprios artigos');
    }

    await this.articlesRepository.delete(id);
  }

  async findByAuthor(authorId: number): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { authorId },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }
}