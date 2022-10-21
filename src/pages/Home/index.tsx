import {
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import fileDownload from 'js-file-download';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PDfDropZone from '../../components/PDfDropZone';
import signFile from '../../resources/singFile';
import singFileInLote from '../../resources/singFileInLote';
import getGovBrUri from '../../utils/getGovBrUri';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [files, setFiles] = useState<File[]>([]);

  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  const inLote = useMemo(() => files.length > 1, [files]);

  const connectClick = () => {
    const widthPopup = 800;
    const heightPopup = 800;
    const left = window.screenX + (window.outerWidth - widthPopup) / 2;
    const top = window.screenY + (window.outerHeight - heightPopup) / 2.5;
    const title = 'Autenticação com Gov.BR';
    const url = getGovBrUri(inLote ? 'signature_session' : 'sign');
    const popup = window.open(
      url,
      title,
      `width=${widthPopup},height=${heightPopup},left=${left},top=${top}`
    );
    setExternalPopup(popup);
  };

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    setUploadProgress(
      Math.round((progressEvent.loaded * 100) / progressEvent.total)
    );
  };

  const handleSubmit = async (code: string) => {
    if (code) {
      setUploadProgress(0);

      const signPdfsPromise = inLote
        ? singFileInLote({
            pdfs: files,
            code,
            onUploadProgress,
          })
        : signFile({
            pdf: files[0],
            code,
            onUploadProgress,
          });

      setLoading(true);

      const { data } = await toast.promise(signPdfsPromise, {
        loading: 'Assinando arquivos',
        success: 'Arquivo gerado com sucessor',
        error: 'Algo de errado aconteceu',
      });

      setLoading(false);

      const outputNameFile = inLote ? 'lote.zip' : files[0].name;

      fileDownload(data, outputNameFile);
    }
  };

  useEffect(() => {
    if (externalPopup) {
      const timer = setInterval(() => {
        if (!externalPopup) {
          timer && clearInterval(timer);
          return;
        }

        const currentUrl = externalPopup.location.href;

        if (!currentUrl) {
          return;
        }
        const searchParams = new URL(currentUrl).searchParams;

        const code = searchParams.get('code');

        if (code) {
          externalPopup.close();
          handleSubmit(code);
        }
      }, 500);
    }
  }, [externalPopup]);

  const isAuthenticated = () => {
    const token = new URL(window.location.href).searchParams.get('q');

    return (token == import.meta.env.VITE_ESPCE_TOKEN);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
    {isAuthenticated() && (
      <Container maxWidth="sm">
        <Typography variant="h4">Assinador</Typography>
          <Stack spacing={2}>
            {uploadProgress > 0 && (
              <Box>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography>Progresso de upload: {uploadProgress}%</Typography>
              </Box>
            )}
            <PDfDropZone files={files} setFiles={setFiles} multiple />
            <Button
              variant="contained"
              onClick={connectClick}
              disabled={loading || files.length <= 0}
            >
              Enviar
            </Button>
          </Stack>
      </Container>
    )}
    </Box>
  );
};

export default Home;
