import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async singIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    if (!user) return new UnauthorizedException('Invalid Credentials');

    const passwordUser = await bcrypt.compare(password, user.passwordHash);
    if (!passwordUser) throw new UnauthorizedException('Invalid Credentials');

    const { passwordHash, ...safe } = user;
    return safe;
  }
}
