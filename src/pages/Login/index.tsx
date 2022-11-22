import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import ControlledTextfield from '../../components/ControlledTextfield';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { control } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

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
          <ControlledTextfield
            control={control}
            name="email"
            textFieldProps={{
              label: 'Email',
              variant: 'outlined',
            }}
          />
          <ControlledTextfield
            control={control}
            name="senha"
            textFieldProps={{
              label: 'Senha',
              variant: 'outlined',
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
