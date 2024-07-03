import HomeIcon from '@mui/icons-material/Home';
import { products as TProduct } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';
import AppPage from './components/AppPage';
import ProductForm from './components/ProductForm';
import global from './styles/global.module.scss';

type TProductProps = {
  product: TProduct;
};

const EditProduct: FC<TProductProps> = ({ product }) => {
  return (
    <AppPage title={product.name} leftIcon={HomeIcon} leftHref="/">
      <ProductForm
        product={product}
        path={`/api/products/update/${product.id}`}
        method="PUT"
      />
    </AppPage>
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
