import { Article } from "@prisma/client";
import { ArticlesService } from "./articles.service";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Permissions } from "src/auth/decorators/permissions.decorator";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { PermissionName } from "src/auth/dto/permission-name.enum";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { CurrentUserDto } from "src/auth/dto/current-user.dto";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin, PermissionName.Editor, PermissionName.Reader)
  async getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin, PermissionName.Editor, PermissionName.Reader)
  async getArticleById(@Param('id') id: string): Promise<Article | null> {
    return this.articlesService.getArticleById(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin, PermissionName.Editor)
  async createArticle(
    @Body() data: CreateArticleDto,
    @CurrentUser() user: CurrentUserDto
  ): Promise<Article> {
    return this.articlesService.createArticle({
      title: data.title,
      content: data.content,
      authorId: user.userId,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin, PermissionName.Editor)
  async updateArticle(
    @Param('id') id: string,
    @Body() data: UpdateArticleDto
  ): Promise<Article> {
    return this.articlesService.updateArticle(parseInt(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin, PermissionName.Editor)
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.deleteArticle(parseInt(id));
  }
}