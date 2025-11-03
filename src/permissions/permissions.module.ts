import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Module({
  controllers: [PermissionController],
  providers: [PermissionsService, PermissionsGuard],
  imports: [PrismaModule],
})
export class PermissionsModule {}
