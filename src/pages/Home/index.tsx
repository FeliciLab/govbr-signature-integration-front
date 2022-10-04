import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import fileDownload from "js-file-download";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import PDfDropZone from "../../components/PDfDropZone";
import signFile from "../../resources/singFile";
import singFileInLote from "../../resources/singFileInLote";
import getGovBrUri, { GetGovBrUriScope } from "../../utils/getGovBrUri";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const [loading, setLoading] = useState(false);

  const [codeWasUsed, setCodeWasUsed] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  // scope é o que define se a assunatura do certificado será em lote ou normal.
  const [scope, setScope] = useLocalStorage<GetGovBrUriScope>(
    "@govbr-signature-integration-front:scope",
    "sign"
  );

  const handleSubmit = async () => {
    if (code) {
      const inLote = scope === "signature_session";

      const signPdfsPromise = inLote
        ? singFileInLote({ pdfs: files, code })
        : signFile({
            pdf: files[0],
            code,
          });

      setLoading(true);

      const { data } = await toast.promise(signPdfsPromise, {
        loading: "Enviando",
        success: "Arquivo gerado com sucessor",
        error: "Algo de errado aconteceu",
      });

      setCodeWasUsed(true);
      setLoading(false);

      const outputNameFile = inLote ? "lote.zip" : files[0].name;

      fileDownload(data, outputNameFile);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4">Assinador</Typography>
        {code ? (
          <Stack spacing={2}>
            <PDfDropZone
              files={files}
              setFiles={setFiles}
              multiple={scope === "signature_session"}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={codeWasUsed || loading}
            >
              Enviar
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              startIcon={<ChevronLeftIcon />}
            >
              Voltar
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Link
              variant="button"
              href={getGovBrUri("sign")}
              onClick={() => setScope("sign")}
            >
              Assinar um arquivo
            </Link>
            <Link
              variant="button"
              href={getGovBrUri("signature_session")}
              onClick={() => setScope("signature_session")}
            >
              Assinar arquivos em Lote
            </Link>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Home;
