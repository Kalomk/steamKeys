import { IsEmail, IsString } from 'class-validator';

export class SecretData {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  secretKey: string;
}
