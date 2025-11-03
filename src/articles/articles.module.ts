import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Module({
  controllers: [ArticleController],
  providers: [ArticlesService, PermissionsGuard],
  imports: [PrismaModule],
})
export class ArticlesModule {}
