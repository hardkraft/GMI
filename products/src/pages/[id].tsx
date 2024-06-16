import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { products as TProduct } from '@prisma/client';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';

type TProductProps = {
  product: TProduct;
};

const Product: FC<TProductProps> = ({ product }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>{product.name}</h1>
      <p>{`${label('Description')} ${product.description}`}</p>
      <p>{`${label('Price')} ${product.price}`}</p>
      <p>{`${label('Quantity')} ${product.quantity}`}</p>
      <Link href={`/edit/${product.id}`}>edit</Link>
      <Link href={`/delete/${product.id}`}>delete</Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TProductProps> = async (
  ctx,
) => {
  const id = ctx.query.id;
  const product = await fetch(`/api/products/${id}`);

  return { props: { product } };
};

export default Product;
