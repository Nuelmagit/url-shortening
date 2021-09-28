import { IsUrl } from 'class-validator';

export class EncodeDto {
  @IsUrl({ require_protocol: true })
  longUrl: string;
}
