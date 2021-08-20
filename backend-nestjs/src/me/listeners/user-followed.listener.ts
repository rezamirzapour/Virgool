/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserFollowedEvent } from '../events';
import { MeService } from '../me.service';

@Injectable()
export class UserFollowedListener {
    constructor(private meService: MeService) { }

    @OnEvent('user.followed', { async: true })
    async handleOrderCreatedEvent(event: UserFollowedEvent) {
        const { following, follower } = event;
        await this.meService.createNotification(follower.id, `شما توسط ${following.firstName} ${following.lastName} دنبال می‌شوید`)
        await this.meService.createNotification(following.id, `شما ${follower.firstName} ${follower.lastName} را دنبال می‌کنید`)
    }
}