import { Box, Container, Stack, TextField, Typography } from '@mui/material';
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
        <Stack spacing={1}>
          <Typography variant="h4">🔥 Login Assinador 🔥</Typography>
          <TextField label="Email" variant="outlined" />
          <TextField label="Senha" variant="outlined" />
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
