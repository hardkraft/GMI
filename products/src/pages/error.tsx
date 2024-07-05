import { GetServerSideProps } from 'next';

import HomeIcon from '@mui/icons-material/Home';
import { FC } from 'react';
import label from 'src/shared/label';
import AppPage from './components/AppPage';
import { Box, IconButton, Link } from '@mui/material';

type TErrorProps = {
  message: string | string[];
};

// Displays error message
const Error: FC<TErrorProps> = ({ message = '' }) => {
  return (
    <AppPage title="Error" leftIcon={HomeIcon} leftHref="/">
      <>
        <Box
          sx={{ whiteSpace: 'pre-wrap' }}
        >{`Something went wrong \n\n${message}`}</Box>
      </>
    </AppPage>
  );
};

export const getServerSideProps: GetServerSideProps<TErrorProps> = async (
  ctx,
) => {
  const message = ctx.query.error;

  return { props: { message } };
};

export default Error;
