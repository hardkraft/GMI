import React from 'react';
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
  TablePagination,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppPage from './components/AppPage';
import label from 'src/shared/label';

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
        <TableCell align="right">{`$${(+product.price).toFixed(2)}`}</TableCell>
        <TableCell align="right" sx={{ width: 100 }}>
          {product.quantity}
        </TableCell>
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
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const rowsPerPage = 5;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = React.useMemo(
    () => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage],
  );

  return (
    <>
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
            {visibleRows.map((product) => (
              <Row key={product.id} product={product} />
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 70.5 * emptyRows,
                }}
              >
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        rowsPerPageOptions={[]}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
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
