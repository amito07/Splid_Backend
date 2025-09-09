import { Controller, Get, Param, Query, Redirect, Req } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Redirect('https://nestjs.com', 301)
  redirectFunc(): string {
    return 'this is user page';
  }

  @Get(':id/profile')
  getProfile(@Req() request: Request, @Param('id') id: string, @Query() query: any): string {
    const { name, age } = query;
    return this.userService.getUserProfile();
  }
}
