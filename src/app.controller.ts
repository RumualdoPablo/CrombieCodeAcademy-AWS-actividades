import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  findAll(@Req() request: Request) {
    console.log(request.headers);
    return 'Damn';
  }
}
