import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { products as TProduct } from '@prisma/client';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';
import global from './styles/global.module.scss';

type THomeProps = {
  products: TProduct[];
};

const Home: FC<THomeProps> = ({ products = [] }) => {
  return (
    <div className={global.global}>
      <h2 style={{ display: 'inline' }}>{label('Products')} </h2>
      <Link href={'/create'}> +{label('Add')}</Link>
      {products.map(({ name, description, id }) => (
        <div key={id}>
          <Link href={`/${id}`}>{name}</Link>
          <div>{description}</div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
  const products = await fetch('/api/products');
  return { props: { products } };
};

export default Home;
