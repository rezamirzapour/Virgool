/* eslint-disable prettier/prettier */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware, NormalizerMilddleware, ParseIntIdMiddleware } from './common/middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MeModule } from './me/me.module';
import { Article, User, Photo, ArticleCategory, Category, Comment, Bookmark, Favorite, Following, Permission, PermissionRole, Role, RoleUser } from 'database/database.entities'
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mariadb',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'virgool-nestjs',
    models: [Article, User, Photo, ArticleCategory, Category, Comment, Bookmark, Favorite, Following, Permission, PermissionRole, Role, RoleUser],
    synchronize: true,
    sync: {
      force: true
    }
  }), JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '60s' },
  }), PassportModule, AuthModule, ArticlesModule, UsersModule, PhotosModule, DatabaseModule, CategoriesModule, CommentsModule, RolesModule, PermissionsModule, MeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NormalizerMilddleware, LoggerMiddleware).forRoutes("api/*")
      .apply(ParseIntIdMiddleware).forRoutes(
        'api/articles/:id',
        'api/categories/:id',
        'api/users/:id',
        'api/roles/:id',
        'api/permissions/:id',
        'api/comments/:id',
      );
  }
}