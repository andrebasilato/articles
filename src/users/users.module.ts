import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PermissionsGuard],
  imports: [PrismaModule],
})
export class UsersModule {}
