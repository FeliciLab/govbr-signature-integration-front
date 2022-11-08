import { Box, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const UserInfos: React.FC = () => {
  const handleLogout = async () => {
    const urlLogout = `${
      import.meta.env.VITE_GOVBR_ACESSO_URL
    }logout?post_logout_redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;

    console.log({ urlLogout });

    window.location.href = urlLogout;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography>Usuário: Fulano de tal</Typography>
      <IconButton edge="end" color="error" onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default UserInfos;
