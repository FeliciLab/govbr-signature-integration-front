import { IconButton, Box, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface FilesListProps {
  files: File[];
  removeFile: (file: File) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, removeFile }) => {
  return (
    <Box>
      {files.map((file) => (
        <Box
          key={file.name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1">{file.name}</Typography>
          <IconButton onClick={() => removeFile(file)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default FilesList;
