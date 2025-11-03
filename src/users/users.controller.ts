import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionName } from 'src/auth/dto/permission-name.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async getUsers(@CurrentUser() user: CurrentUserDto) {
    return {
      me: user,
      users: await this.userService.getUsers(),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.getUserById(parseInt(id));
    if (!user) {
      throw new NotFoundException('Invalid user ID');
    }
    return user;
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionName.Admin)
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteUser(parseInt(id));
    } catch (error) {
      throw new BadRequestException('Invalid user ID');
    }
  }
}
