import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Pages
  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  home() {
    return;
  }

  @Get(':id')
  @Render('[id]')
  @UseInterceptors(ParamsInterceptor)
  public product(@Param('id') id: string) {
    return { id };
  }

  // API
  @Get('/api/products')
  public listProducts() {
    return this.appService.getAll();
  }
  @Get('/api/products/:id')
  public getProductById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getOne(id);
  }
}
