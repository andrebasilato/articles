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
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@prisma/client';

class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  permissionId!: number;
}

class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  permissionId?: number;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.getUserById(parseInt(id));
    if (!user) {
      throw new NotFoundException('Invalid user ID');
    }
    return user;
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id), data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteUser(parseInt(id));
    } catch (error) {
      throw new BadRequestException('Invalid user ID');
    }
  }
}
