import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { StampingDto } from './stampings/stamping.interface';

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
  
  @UseGuards(LocalAuthGuard)
  @Post('firebase-login')
  async loginFirebase(@Request() req) {
    let response = await this.authService.loginFirebase(req);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-stamping')
  async createStamping(@Body() stampingDto: StampingDto) {
    let response = await this.authService.createStamping(stampingDto);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('list-stampings')
  async getListStampings(@Request() req) {
    let response = await this.authService.getStampings(req);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-stamping')
  async deleteStamping(@Body() req) {
    let response = await this.authService.deleteStamping(req);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('stampings')
  getStampings(): string {
    return this.appService.getHello();
  }
}
