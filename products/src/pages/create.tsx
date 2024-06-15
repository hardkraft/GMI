import { GetServerSideProps } from 'next';
import Link from 'next/link';
import label from 'src/shared/label';
import ProductForm from './components/ProductForm';

const CreateProduct = () => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>{`${label('New Product')}`}</h1>
      <ProductForm path={'/api/products/create/'} />
    </div>
  );
};

export default CreateProduct;
