import NextLink from 'next/link';
import { Component, FC, JSXElementConstructor, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  SvgIconTypeMap,
} from '@mui/material';
import label from 'src/shared/label';
import global from '../styles/global.module.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type TPageProps = {
  leftIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  leftHref?: string;
  title: string;
  right?: FC;
  children?: ReactNode;
};

const AppPage: FC<TPageProps> = ({
  title = 'Products',
  leftIcon: LeftIcon,
  leftHref,
  right: Right,
  children,
}) => {
  return (
    <Box className={global.global} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {LeftIcon && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label={label('Add')}
              sx={{ mr: 2 }}
              LinkComponent={NextLink}
              href={leftHref}
            >
              <LeftIcon />
            </IconButton>
          )}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {label(title)}
          </Typography>
          {Right && (
            <Box sx={{ float: 'right' }}>
              <Right />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 4 }}>{children}</Box>
    </Box>
  );
};

export default AppPage;
