import { HttpException, Injectable } from '@nestjs/common';
import { signUpDto } from './auth.dto';
import { PrismaService } from 'src/common/Prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SendResponse } from 'src/common/utils/sendResponse';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandler } from 'src/common/utils/errorResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Business logic for authentication will go here
  async signUpFunction(signUpBody: signUpDto): Promise<SendResponse<null>> {
    try {
      const { email, password } = signUpBody;

      // check email already exists in the database

      const isExist = await this.prisma.user.findFirst({
        where: { email },
      });

      if (isExist) {
        throw new HttpException('Email already exists', 400);
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const data = {
        ...signUpBody,
        password: hashedPassword,
      };

      // save the user in the database
      await this.prisma.user.create({ data });
      return new SendResponse(201, 'User created successfully', null);
    } catch (error) {
      ErrorHandler.handle(error, 'Failed to create user');
    }
  }

  async loginFunction(
    email: string,
    password: string,
  ): Promise<SendResponse<any>> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', 401);
      }

      const payload = { userId: user.id, name: user.name };

      // create JWT token
      const token = await this.jwtService.signAsync(payload);

      return new SendResponse(200, 'User logged in successfully', { token });
    } catch (error) {
       ErrorHandler.handle(error, 'Login failed');
    }
  }
}
