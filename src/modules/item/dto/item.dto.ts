import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  status: string;

  createdOn?: Date;

  updatedOn?: Date;
}
