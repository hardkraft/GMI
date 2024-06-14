import { Injectable, NotFoundException } from '@nestjs/common';
import { TProduct } from '../shared/types/product';

let PRODUCTS: TProduct[] = [
  {
    id: 1,
    name: 'Product 1',
    description:
      'Aute laboris consectetur ullamco elit excepteur qui fugiat adipisicing excepteur in ea culpa occaecat.',
    price: 100,
    quantity: 100,
  },
  {
    id: 2,
    name: 'Product 2',
    description:
      'Ipsum nostrud aliqua officia labore elit adipisicing deserunt elit.',
    price: 200,
    quantity: 200,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Minim do aliquip voluptate do ipsum.',
    price: 300,
    quantity: 300,
  },
  {
    id: 4,
    name: 'Product 4',
    description:
      'Ex proident tempor esse ipsum do ut minim quis laboris aute duis exercitation id.',
    price: 400,
    quantity: 400,
  },
];

@Injectable()
export class AppService {
  getAll(): TProduct[] {
    return PRODUCTS;
  }

  getOne(id: number): TProduct {
    const product = PRODUCTS.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  create(product: TProduct): void {
    PRODUCTS.push(product);
  }

  update(id: number, updatedProduct: TProduct): void {
    const productIndex = PRODUCTS.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new NotFoundException();
    }
    PRODUCTS[productIndex] = { ...updatedProduct, id };
  }

  delete(id: number): void {
    PRODUCTS = PRODUCTS.filter((product) => product.id !== id);
  }
}
