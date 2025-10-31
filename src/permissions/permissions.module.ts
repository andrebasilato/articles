import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionsService],
  imports: [PrismaModule],
})
export class PermissionsModule {}
