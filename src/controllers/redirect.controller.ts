import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { RedicrectService } from 'src/services/redirect.service';

@Controller()
export class RedirectController {
  constructor(private readonly redicrectService: RedicrectService) {}

  @Get(':shortUrl')
  @Redirect()
  reFromShortUrl(@Param('shortUrl') shortUrl: string) {
    return this.redicrectService.redirect(shortUrl);
  }
}
