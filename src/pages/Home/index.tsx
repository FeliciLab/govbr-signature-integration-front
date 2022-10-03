import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import fileDownload from "js-file-download";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import signFile from "../../resources/singFile";
import singFileInLote from "../../resources/singFileInLote";
import getGovBrUri, { GetGovBrUriScope } from "../../utils/getGovBrUri";
interface HomeFormData {
  pdfs: File[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  // scope é o que define se a assunatura do certificado será em lote ou normal.
  const [scope, setScope] = useLocalStorage<GetGovBrUriScope>(
    "@govbr-signature-integration-front:scope",
    "sign"
  );

  const { register, handleSubmit } = useForm<HomeFormData>();

  const onSubmit = async ({ pdfs }: HomeFormData) => {
    if (code) {
      const inLote = pdfs.length > 1;

      const signPdfsPromise = inLote
        ? singFileInLote({ pdfs, code })
        : signFile({
            pdf: pdfs[0],
            code,
          });

      const { data } = await toast.promise(signPdfsPromise, {
        loading: "Enviando",
        success: "Arquivo gerado com sucessor",
        error: "Algo de errado aconteceu",
      });

      const outputNameFile = inLote ? "lote.zip" : pdfs[0].name;

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                component="label"
                endIcon={<CloudUploadIcon />}
              >
                Upload do arquivo
                <input
                  hidden
                  type="file"
                  accept="application/pdf"
                  multiple={scope === "signature_session"}
                  {...register("pdfs")}
                />
              </Button>
              <Button variant="contained" type="submit">
                Enviar
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                startIcon={<ChevronLeftIcon />}
              >
                Voltar
              </Button>
            </Stack>
          </form>
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
