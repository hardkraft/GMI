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
  All,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { AppService } from './app.service';
import { products as TProduct } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Pages
  @All('/')
  @Render('index')
  public home() {
    return 'Home';
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
  public saveProduct() {
    return;
  }

  @Post('error')
  @Render('error')
  public error(@Body() error: string) {
    console.log(error);
    return { error };
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
  public async createProduct(@Body() product: TProduct) {
    const _product = await this.appService.create(product);
    if (_product) return { path: '/', error: null };
    else
      return {
        path: '/error',
        error: `Update of ${product.name} failed. Make sure all the data is correct \n${JSON.stringify(product)}`,
      };
  }

  @Put('/api/products/update/:id')
  public async updateProductById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatedProduct: TProduct,
  ) {
    const product = await this.appService.update(id, updatedProduct);
    if (product) return { path: '/', error: null };
    else
      return {
        path: '/error',
        error: `Update of ${updatedProduct.name} failed. Make sure all the data is correct \n${JSON.stringify(updatedProduct)}`,
      };
  }

  @Get('delete/:id')
  @Delete('/api/products/delete/:id')
  @Redirect('/')
  public deleteProductById(@Param('id', new ParseIntPipe()) id: number) {
    this.appService.delete(id);
  }
}
