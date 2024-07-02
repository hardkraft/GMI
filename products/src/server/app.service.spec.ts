import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { product } from '../../test/mocks';

describe('AppService', () => {
  let appService: AppService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, PrismaService],
    }).compile();

    appService = app.get<AppService>(AppService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('getAll', () => {
    it('should return all products', async () => {
      const result = [product];
      jest
        .spyOn(prismaService.products, 'findMany')
        .mockImplementation(async () => result);
      expect(await appService.getAll()).toBe(result);
    });
  });

  describe('getOne', () => {
    it('should return one product', async () => {
      const result = product;
      jest
        .spyOn(prismaService.products, 'findUnique')
        .mockImplementation(async () => result);
      expect(await appService.getOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest
        .spyOn(prismaService.products, 'create')
        .mockImplementation(async () => product);
      expect(await appService.create(product)).toBe(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      jest
        .spyOn(prismaService.products, 'update')
        .mockImplementation(async () => product);
      expect(await appService.update(1, product)).toBe(product);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      jest
        .spyOn(prismaService.products, 'delete')
        .mockImplementation(async () => product);
      expect(await appService.delete(1)).toBe(product);
    });
  });
});
