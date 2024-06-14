import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { TProduct } from 'src/shared/types/product';
import { fetch } from 'src/shared/fetch';

type TProductProps = {
  product: TProduct;
};

const Product: FC<TProductProps> = ({ product }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>{product.name}</h1>
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
