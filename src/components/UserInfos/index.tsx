import { Box, IconButton, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const UserInfos: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography>Usuário: Fulano de tal</Typography>
      <IconButton edge="end" color="error">
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default UserInfos;
