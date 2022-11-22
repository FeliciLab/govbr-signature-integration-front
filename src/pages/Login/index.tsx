import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledTextfield from '../../components/ControlledTextfield';
import schema from './schema';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(schema),
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit">Acessar</Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
