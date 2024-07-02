import { products as TProduct } from '@prisma/client';
import { Prisma } from '@prisma/client';

export const product: TProduct = {
  id: 1,
  name: 'Test',
  description: 'Description',
  price: new Prisma.Decimal(1),
  quantity: 10,
  timestamp: new Date('2000/01.01'),
  document: {},
};
