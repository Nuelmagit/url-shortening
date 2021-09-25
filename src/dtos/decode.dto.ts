import { IsAlphanumeric } from 'class-validator';

export class DecodeDto {
  @IsAlphanumeric()
  shortUrl: string;
}
