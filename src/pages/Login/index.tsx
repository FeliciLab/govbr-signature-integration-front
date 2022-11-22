import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';

const Login: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Typography>Login</Typography>
      </Container>
    </Box>
  );
};

export default Login;
