import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { products as TProduct } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<TProduct[]> {
    return this.prisma.products.findMany();
  }

  async getOne(id: number): Promise<TProduct | null> {
    const product = this.prisma.products.findUnique({ where: { id: +id } });

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async create(data: TProduct): Promise<TProduct> {
    return this.prisma.products.create({
      data,
    });
  }

  async update(id: number, data: TProduct): Promise<TProduct> {
    return this.prisma.products.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number): Promise<TProduct> {
    return this.prisma.products.delete({
      where: { id: Number(id) },
    });
  }
}
