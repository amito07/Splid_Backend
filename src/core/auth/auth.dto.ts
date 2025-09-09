import { IsString, MinLength } from 'class-validator';
export class signUpDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
