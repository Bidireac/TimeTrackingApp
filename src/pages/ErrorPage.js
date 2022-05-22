import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomContainer = styled(Container)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const CustomButton = styled(Button)({
  marginTop: '30px',
  color: '#000',
  borderColor: '#000',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#000',
    color: '#fff',
  },
});

const ErrorPage = () => {
  return (
    <CustomContainer>
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h4" component="h2">
        The Page you tried to access doesn't exist.
      </Typography>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <CustomButton variant="outlined">Go Back</CustomButton>
      </NavLink>
    </CustomContainer>
  );
};

export default ErrorPage;
