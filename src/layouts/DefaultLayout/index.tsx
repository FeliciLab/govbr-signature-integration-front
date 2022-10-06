import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TopAppBar from '../../components/TopAppBar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <TopAppBar />

      <Box>{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
