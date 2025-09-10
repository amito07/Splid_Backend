import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './auth.dto';
import { SendResponse } from 'src/common/utils/sendResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpBody: signUpDto): Promise<SendResponse<null>> {
    return this.authService.signUpFunction(signUpBody);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<SendResponse<any>> {
    return this.authService.loginFunction(email, password);
  }
}
