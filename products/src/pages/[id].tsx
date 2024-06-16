import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { products as TProduct } from '@prisma/client';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';
import global from './styles/global.module.scss';

type TProductProps = {
  product: TProduct;
};

const Product: FC<TProductProps> = ({ product }) => {
  return (
    <div className={global.global}>
      <Link href={'/'}>{`${label('Home')}`}</Link>
      <h2>{product.name}</h2>
      <span>{`${label('Description')}`}</span>
      <div>{`${product.description}`}</div>

      <span>{`${label('Price')}`}</span>
      <div>{`${product.price}`}</div>

      <span>{`${label('Quantity')}`}</span>
      <div>{`${product.quantity}`}</div>
      <Link href={`/edit/${product.id}`}>{`${label('Edit')}`}</Link>
      <Link href={`/delete/${product.id}`}>{`${label('Delete')}`}</Link>
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
