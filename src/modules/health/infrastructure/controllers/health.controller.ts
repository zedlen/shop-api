import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';


@Controller('')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)  
  @Get()
  checkHealth() {
    return {
      status: HttpStatus.OK,
      message: 'Server is up',
    };
  }

}
