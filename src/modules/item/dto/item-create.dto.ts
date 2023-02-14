import { IsString, IsNumber } from 'class-validator';

export class ItemCreateDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly status: string;
}
