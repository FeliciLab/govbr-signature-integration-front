import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface FilesListProps {
  files: File[];
  removeFile: (file: File) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, removeFile }) => {
  return (
    <Box maxHeight={220} overflow="auto">
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
