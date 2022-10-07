import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
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
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        border: 2,
        borderStyle: 'dashed',
        borderColor: palette.primary.main,
      }}
    >
      <Stack alignItems="center" {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" />
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          Arraste e solte alguns arquivos aqui ou clique para selecionar os
          arquivos
        </Typography>
      </Stack>
      <Typography variant="h6">Arquivos selecionados</Typography>
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
        <Typography>Nenhum arquivo selecionado</Typography>
      )}
    </Paper>
  );
};

export default PDfDropZone;
