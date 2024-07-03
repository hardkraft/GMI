import { GetServerSideProps } from 'next';
import NextLink from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { FC } from 'react';
import { products as TProduct } from '@prisma/client';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';
import AppPage from './components/AppPage';
import { Box, IconButton, Link } from '@mui/material';

type TProductProps = {
  product: TProduct;
};

const Product: FC<TProductProps> = ({ product }) => {
  const right = () => {
    return (
      <>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label={label('Edit')}
          sx={{ mr: 4 }}
          LinkComponent={NextLink}
          href={`/edit/${product.id}`}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label={label('Delete')}
          LinkComponent={NextLink}
          href={`/delete/${product.id}`}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </>
    );
  };
  return (
    <AppPage
      title={product.name}
      leftIcon={HomeIcon}
      leftHref="/"
      right={right}
    >
      <>
        <Box
          sx={{ mb: 2, whiteSpace: 'pre-wrap' }}
        >{`${product.description}`}</Box>

        <span>{`$${product.price}`}</span>
        <span>{`${product.quantity} left`}</span>
      </>
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

export default Product;
