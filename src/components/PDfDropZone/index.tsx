import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import FilesList from '../FilesList';

interface PDfDropZoneProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  multiple: boolean;
}

const PDfDropZone: React.FC<PDfDropZoneProps> = ({
  files,
  setFiles,
  multiple,
}) => {
  const { palette } = useTheme();

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (file: File) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple,
    onDrop,
  });

  return (
    <Box>
      <Stack
        alignItems="center"
        sx={{
          padding: 2,
          border: 2,
          borderStyle: 'dashed',
          backgroundColor: '#F5F5F5',
          borderColor: palette.primary.main,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" />
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          Clique aqui ou arraste e solte os arquivos de certificados em formato
          PDF
        </Typography>
      </Stack>
      <Typography variant="h6" mt={1} sx={{ fontWeight: 500 }}>
        Arquivos selecionados
      </Typography>
      {files.length > 0 ? (
        <Box>
          <FilesList files={files} removeFile={removeFile} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button
              onClick={removeAllFiles}
              color="warning"
              startIcon={<DeleteIcon />}
            >
              Remove todos
            </Button>
            <Typography variant="subtitle1">
              Quantidade: {files.length}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Nenhum arquivo selecionado</Typography>
      )}
    </Box>
  );
};

export default PDfDropZone;
