import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserProfile(): string {
    return 'User profile data';
  }
}
