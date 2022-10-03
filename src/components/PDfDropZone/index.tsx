import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { green, grey } from "@mui/material/colors";
import { Stack } from "@mui/system";

interface PDfDropZoneProps {
  acceptedFiles: File[];
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
}

const PDfDropZone: React.FC<PDfDropZoneProps> = ({
  acceptedFiles,
  getInputProps,
  getRootProps,
}) => {
  const { palette } = useTheme();

  const FilesList = () => (
    <ul>
      {acceptedFiles.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
  );

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
      <FilesList />
    </Paper>
  );
};

export default PDfDropZone;
