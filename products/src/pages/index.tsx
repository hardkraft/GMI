import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { TProduct } from 'src/shared/types/product';
import { fetch } from 'src/shared/fetch';
import label from 'src/shared/label';

type THomeProps = {
  products: TProduct[];
};

const Home: FC<THomeProps> = ({ products = [] }) => {
  console.log(products);
  return (
    <div>
      <h1>{label('Products')}</h1>
      {products.map(({ name, description, id }) => (
        <div key={id}>
          <Link href={`/${id}`}>{name}</Link>
          <p>{description}</p>
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
