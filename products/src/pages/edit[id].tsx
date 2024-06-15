import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { TProduct } from 'src/shared/types/product';
import { fetch } from 'src/shared/fetch';
import ProductForm from './components/ProductForm';

type TProductProps = {
  product: TProduct;
};

const EditProduct: FC<TProductProps> = ({ product }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <ProductForm
        product={product}
        path={`/api/products/update/${product.id}`}
      />
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

export default EditProduct;
