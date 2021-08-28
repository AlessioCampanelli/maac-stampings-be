import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('v1/api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stampings')
  getStampings(): string {
    console.log('stampings arriveeeed');
    return this.appService.getHello();
  }
}
