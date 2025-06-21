import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module'; // Importar UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    AuthModule, // Adicionar AuthModule para usar o UrlTokenAuthGuard
    UsersModule, // Adicionar UsersModule para disponibilizar UsersService
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}