import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      msg: 'This is the MaxAutos Api root',
      documentation: '/docs',
    };
  }
}
