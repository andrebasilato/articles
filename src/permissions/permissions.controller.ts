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
} from '@nestjs/common';

class CreatePermissionDto {
  name!: string;
  description!: string;
}

class UpdatePermissionDto {
  name?: string;
  description?: string;
}

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async getPermissions() {
    return this.permissionsService.getPermissions();
  }

  @Get(':id')
  async getPermissionById(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionsService.getPermissionById(parseInt(id));
  }

  @Post()
  async createPermission(
    @Body() data: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.createPermission({
      name: data.name,
      description: data.description,
    });
  }

  @Put(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() data: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.updatePermission(parseInt(id), data);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.deletePermission(parseInt(id));
  }
}
