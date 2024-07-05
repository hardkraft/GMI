import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { products as TProduct } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<TProduct[]> {
    try {
      const products = await this.prisma.products.findMany();
      return products;
    } catch (e) {
      console.error(e);
    }
  }

  async getOne(id: number): Promise<TProduct | null> {
    try {
      const product = await this.prisma.products.findUnique({
        where: { id: +id },
      });

      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (e) {
      console.error(e);
    }
  }

  async create(data: TProduct): Promise<TProduct | null> {
    try {
      const product = await this.prisma.products.create({
        data,
      });
      return product;
    } catch (e) {
      console.error(e, data);
    }
  }

  async update(id: number, data: TProduct): Promise<TProduct | null> {
    try {
      const product = await this.prisma.products.update({
        where: { id: Number(id) },
        data,
      });
      return product;
    } catch (e) {
      console.error(e, data);
      return;
    }
  }

  async delete(id: number): Promise<TProduct> {
    try {
      const product = await this.prisma.products.delete({
        where: { id: Number(id) },
      });
      return product;
    } catch (e) {
      console.error(e);
    }
  }
}
