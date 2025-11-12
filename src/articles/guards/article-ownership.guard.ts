import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleOwnershipGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as {
      userId: number;
      email: string;
      permissionName?: string;
    };

    const idParam = request.params?.id;
    const articleId = parseInt(idParam, 10);

    if (!articleId || Number.isNaN(articleId)) {
      throw new NotFoundException('Invalid article ID');
    }

    const article = await this.prisma.article.findFirst({
      where: { id: articleId, deletedAt: null },
      select: { id: true, authorId: true },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const isAdmin = user?.permissionName === 'Admin';
    const isOwner = article.authorId === user?.userId;

    if (isAdmin || isOwner) {
      return true;
    }

    throw new ForbiddenException('You are not allowed to modify this article');
  }
}