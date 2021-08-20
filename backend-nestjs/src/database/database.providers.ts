/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Article, User, Following, Bookmark, Photo, Category, ArticleCategory, Comment, Favorite, Role, Permission, PermissionRole, RoleUser, Notification } from './database.entities'

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mariadb',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'virgool-nestjs',
            });
            sequelize.addModels([Article, User, Following, Bookmark, Favorite, Photo, Category, Comment, ArticleCategory, Role, Permission, PermissionRole, RoleUser, Notification]);
            await sequelize.sync();
            return sequelize;
        },
    },
];