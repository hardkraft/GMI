import { Prisma, products as TProduct } from '@prisma/client';

export const product: TProduct = {
  id: 1,
  name: 'Test',
  description: 'Description',
  price: new Prisma.Decimal(1),
  quantity: 10,
  timestamp: null,
  document: null,
};
