import { IsUrl } from 'class-validator';

export class EncodeDto {
  @IsUrl()
  longUrl: string;
}
