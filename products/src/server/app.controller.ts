import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Render,
  Redirect,
  Put,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { AppService } from './app.service';
import { products as TProduct } from '@prisma/client';
// import { TProduct } from 'src/shared/types/product';

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

  @Get('edit/:id')
  @Render('edit[id]')
  @UseInterceptors(ParamsInterceptor)
  public editProduct(@Param('id') id: string) {
    return { id };
  }

  @Get('create')
  @Render('create')
  @UseInterceptors(ParamsInterceptor)
  public saveProduct() {
    return;
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
  @Post('/api/products/create/')
  public createProduct(@Body() product: TProduct) {
    this.appService.create(product);
  }
  @Put('/api/products/update/:id')
  public updateProductById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatedProduct: TProduct,
  ) {
    this.appService.update(id, updatedProduct);
  }
  @Get('delete/:id')
  @Delete('/api/products/delete/:id')
  @Redirect('/')
  public deleteProductById(@Param('id', new ParseIntPipe()) id: number) {
    this.appService.delete(id);
  }
}
