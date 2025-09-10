import { IsString, MinLength } from 'class-validator';
export class signUpDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
