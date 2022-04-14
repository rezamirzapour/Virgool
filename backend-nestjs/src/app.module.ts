/* eslint-disable prettier/prettier */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';
import {
  Article,
  User,
  Photo,
  ArticleCategory,
  Category,
  Comment,
  Bookmark,
  Favorite,
  Following,
  Permission,
  PermissionRole,
  Role,
  Notification,
} from './database/database.entities';
import { LoggerMiddleware, ParseIntIdMiddleware } from 'src/common/middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MeModule } from './me/me.module';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './gurad/guards.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'virgool-nestjs',
      models: [
        Article,
        User,
        Photo,
        ArticleCategory,
        Category,
        Comment,
        Bookmark,
        Favorite,
        Following,
        Permission,
        PermissionRole,
        Role,
        Notification,
      ],
      synchronize: true,
      sync: {
        force: true,
      },
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    EventEmitterModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    PassportModule,
    GuardsModule,
    AuthModule,
    ArticlesModule,
    UsersModule,
    PhotosModule,
    DatabaseModule,
    CategoriesModule,
    CommentsModule,
    RolesModule,
    PermissionsModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('api/*')
      .apply(ParseIntIdMiddleware)
      .forRoutes(
        'api/articles/:id',
        'api/categories/:id',
        'api/users/:id',
        'api/roles/:id',
        'api/permissions/:id',
        'api/comments/:id',
      );
  }
}
