import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticlesService],
  imports: [PrismaModule],
})
export class ArticlesModule {}
