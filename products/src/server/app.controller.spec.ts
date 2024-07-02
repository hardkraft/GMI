import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { product } from '../../test/mocks';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Home"', () => {
      expect(appController.home()).toBe('Home');
    });
  });

  describe('product', () => {
    it('should return product id', () => {
      const id = '1';
      expect(appController.product(id)).toEqual({ id });
    });
  });

  describe('editProduct', () => {
    it('should return product id', () => {
      const id = '1';
      expect(appController.editProduct(id)).toEqual({ id });
    });
  });

  describe('listProducts', () => {
    it('should return list of products', async () => {
      const result = [product];
      jest.spyOn(appService, 'getAll').mockImplementation(async () => result);
      expect(await appController.listProducts()).toBe(result);
    });
  });

  describe('getProductById', () => {
    it('should return a product', async () => {
      const result = product;
      jest.spyOn(appService, 'getOne').mockImplementation(async () => result);
      expect(await appController.getProductById(1)).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      jest.spyOn(appService, 'create').mockImplementation(() => undefined);
      expect(await appController.createProduct(product)).toBeUndefined();
      expect(appService.create).toHaveBeenCalledWith(product);
    });
  });

  describe('updateProductById', () => {
    it('should update a product', async () => {
      jest.spyOn(appService, 'update').mockImplementation(() => undefined);
      expect(await appController.updateProductById(1, product)).toBeUndefined();
      expect(appService.update).toHaveBeenCalledWith(1, product);
    });
  });

  describe('deleteProductById', () => {
    it('should delete a product', async () => {
      jest.spyOn(appService, 'delete').mockImplementation(() => undefined);
      expect(await appController.deleteProductById(1)).toBeUndefined();
      expect(appService.delete).toHaveBeenCalledWith(1);
    });
  });
});
