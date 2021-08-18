/* eslint-disable prettier/prettier */
import { Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MeService } from './me.service';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { ApiController, User } from 'common/decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'users/dto';
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiController("me")
export class MeController {
  constructor(private readonly meService: MeService) { }


  @Get('profile')
  async getProfile(@User() user) {
    return user
  }

  @Put("profile")
  async updateProfile(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return this.meService.updateProfile(user, updateUserDto)
  }

  @Get('users/followers')
  async getFollowers() {

  }

  @Get("users/followings")
  async getFollowings() {

  }

  @Post("users/:userId/follow")
  async follow() {

  }

  @Post("users/:userId/unfollow")
  async unfollow() {

  }
  @Post("articles/:articleId/like")
  async likeArticle() {

  }

  @Post("articles/:articleId/bookmark")
  async bookmarkArticle() {

  }

  @Get("articles/bookmarks")
  async getMyBookmarkedArticles() {

  }


  @Get("articles/favorites")
  async getMyFavoriteArticles() {

  }

  @Get("articles/favorites")
  async getMyPublishedArticles() {

  }

}
