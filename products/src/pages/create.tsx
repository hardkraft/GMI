import { GetServerSideProps } from 'next';
import Link from 'next/link';
import label from 'src/shared/label';
import ProductForm from './components/ProductForm';
import global from './styles/global.module.scss';

const CreateProduct = () => {
  return (
    <div className={global.global}>
      <Link href={'/'}>{`${label('Home')}`}</Link>
      <h2>{`${label('New Product')}`}</h2>
      <ProductForm path={'/api/products/create/'} />
    </div>
  );
};

export default CreateProduct;
