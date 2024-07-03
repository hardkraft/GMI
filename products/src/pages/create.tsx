import { GetServerSideProps } from 'next';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

import label from 'src/shared/label';
import ProductForm from './components/ProductForm';
import global from './styles/global.module.scss';
import AppPage from './components/AppPage';

const CreateProduct = () => {
  return (
    <AppPage title="New Product" leftIcon={HomeIcon} leftHref="/">
      <ProductForm path="/api/products/create/" />
    </AppPage>
  );
};

export default CreateProduct;
