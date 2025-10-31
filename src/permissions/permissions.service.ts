import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPermissions(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    return this.prisma.permission.findFirst({ where: { id } });
  }

  async createPermission(data: {
    name: string;
    description: string;
  }): Promise<Permission> {
    return this.prisma.permission.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async updatePermission(
    id: number,
    data: Partial<{ name: string; description: string }>,
  ): Promise<Permission> {
    return this.prisma.permission.update({ where: { id }, data });
  }

  async deletePermission(id: number): Promise<Permission> {
    return this.prisma.permission.delete({ where: { id } });
  }
}
