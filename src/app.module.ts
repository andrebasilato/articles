import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ArticlesModule, PermissionsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
