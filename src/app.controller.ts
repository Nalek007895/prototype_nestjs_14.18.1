import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Healthz' })
  getHello() {
    return {
      date: new Date(),
      status: 'ok'
    }
  }
}
