import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, deletedAt: null },
      include: { permission: true },
    });

    if (!user) throw new UnauthorizedException('Invalid Credentials!');

    const passwordUser = await bcrypt.compare(password, user.passwordHash);
    if (!passwordUser) throw new UnauthorizedException('Invalid Credentials!');

    const payload = {
      userId: user.id,
      email: user.email,
      permissionId: user.permissionId,
      permissionName: user.permission.name,
    };

    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}
