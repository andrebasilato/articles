import { Article } from "@prisma/client";
import { ArticlesService } from "./articles.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string): Promise<Article | null> {
    return this.articlesService.getArticleById(parseInt(id));
  }

  @Post()
  async createArticle(@Body() data: Article): Promise<Article> {
    return this.articlesService.createArticle(data);
  }

  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() data: Article): Promise<Article> {
    return this.articlesService.updateArticle(parseInt(id), data);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.deleteArticle(parseInt(id));
  }
}