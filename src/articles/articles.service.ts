import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles(): Promise<Article[]> {
    return this.prisma.article.findMany({ where: { deletedAt: null } });
  }

  async getArticleById(id: number): Promise<Article | null> {
    return this.prisma.article.findFirst({ where: { id, deletedAt: null } });
  }

  async createArticle(data: {
    title: string;
    content: string;
    authorId: number;
  }): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  async updateArticle(
    id: number,
    data: Partial<{ title: string; content: string }>,
  ): Promise<Article> {
    return this.prisma.article.update({ where: { id }, data });
  }

  async deleteArticle(id: number): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
