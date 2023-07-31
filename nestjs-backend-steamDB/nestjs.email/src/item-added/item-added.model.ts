import { IsNotEmpty, IsString } from 'class-validator';

export class ItemAddedValidation {
  @IsNotEmpty()
  @IsString()
  sender: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  price: string;
  @IsNotEmpty()
  @IsString()
  Dashboard_id: string;
}
