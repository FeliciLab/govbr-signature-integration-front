import { Box, Button, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const UserInfos: React.FC = () => {
  const handleLogout = async () => {
    const urlLogout = `${
      import.meta.env.VITE_GOVBR_ACESSO_URL
    }logout?post_logout_redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;

    window.location.href = urlLogout;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        marginY: 1,
      }}
    >
      <Button
        variant="contained"
        disableElevation
        color="warning"
        endIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserInfos;
