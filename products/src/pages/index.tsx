import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { FC } from 'react';
import { products as TProduct } from '@prisma/client';
import { fetch } from 'src/shared/fetch';
import Typography from '@mui/material/Typography';
import {
  Box,
  IconButton,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppPage from './components/AppPage';
import label from 'src/shared/label';
import React from 'react';

type THomeProps = {
  products: TProduct[];
};

const Row: FC<{ product: TProduct }> = ({ product }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: 42 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Button LinkComponent={NextLink} href={`/${product.id}`}>
            {product.name}
          </Button>
        </TableCell>
        <TableCell align="right">{`$${product.price.toString()}`}</TableCell>
        <TableCell align="right">{product.quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {product.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProductTable: FC<THomeProps> = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{label('Name')}</TableCell>
            <TableCell align="right">{label('Price')}</TableCell>
            <TableCell align="right">{label('Quantity')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <Row key={p.id} product={p} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Home: FC<THomeProps> = ({ products = [] }) => {
  return (
    <AppPage
      title="Products"
      leftIcon={AddCircleOutlineOutlinedIcon}
      leftHref="/create"
    >
      <ProductTable products={products} />
    </AppPage>
  );
};

export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
  const products = await fetch('/api/products');
  return { props: { products } };
};

export default Home;
