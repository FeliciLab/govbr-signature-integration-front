import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
import { Box } from '@mui/system';

export interface ErrorCardProps {
  title?: string;
  message?: string;
  action?: () => void;
  actionLabel?: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
  message,
  title,
  action,
  actionLabel,
}) => {
  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <CardContent>
        <Box display="flex" gap={1}>
          <ReportIcon color="error" />
          <Typography variant="body1">{message}</Typography>
        </Box>
      </CardContent>
      {action && (
        <CardActions>
          <Button onClick={action}>{actionLabel}</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ErrorCard;
