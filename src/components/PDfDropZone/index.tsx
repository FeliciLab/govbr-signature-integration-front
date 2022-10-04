import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Paper, Typography, useTheme, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDropzone } from "react-dropzone";
import FilesList from "../FilesList";
import DeleteIcon from "@mui/icons-material/Delete";

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
      "application/pdf": [".pdf"],
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
        borderStyle: "dashed",
        borderColor: palette.primary.main,
      }}
    >
      <Stack alignItems="center" {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" />
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Arraste e solte alguns arquivos aqui ou clique para selecionar os
          arquivos
        </Typography>
      </Stack>
      <Typography variant="h6">Arquivos selecionados</Typography>
      {files.length > 0 ? (
        <>
          <FilesList files={files} removeFile={removeFile} />
          <Button
            onClick={removeAllFiles}
            color="warning"
            startIcon={<DeleteIcon />}
          >
            Remove todos
          </Button>
        </>
      ) : (
        <Typography>Nenhum arquivo selecionado</Typography>
      )}
    </Paper>
  );
};

export default PDfDropZone;
