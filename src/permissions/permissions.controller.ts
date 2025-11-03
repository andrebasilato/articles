import { Permission } from '@prisma/client';
import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionName } from 'src/auth/dto/permission-name.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async getPermissions() {
    return this.permissionsService.getPermissions();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async getPermissionById(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionsService.getPermissionById(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async createPermission(
    @Body() data: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.createPermission({
      name: data.name,
      description: data.description,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async updatePermission(
    @Param('id') id: string,
    @Body() data: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.updatePermission(parseInt(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async deletePermission(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.deletePermission(parseInt(id));
  }
}
