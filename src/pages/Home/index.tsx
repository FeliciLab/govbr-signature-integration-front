import {
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PDfDropZone from '../../components/PDfDropZone';
import UserInfos from '../../components/UserInfos';
import signFile from '../../resources/singFile';
import singFileInLote from '../../resources/singFileInLote';
import getGovBrUri from '../../utils/getGovBrUri';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [messageError, setMessageError] = useState<null | string>(null);

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
    try {
      setLoading(true);
      setMessageError(null);

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

        const { data } = await toast.promise(signPdfsPromise, {
          loading: 'Assinando arquivos',
          success: 'Arquivo gerado com sucesso',
          error: 'Algo de errado aconteceu ',
        });

        const outputNameFile = inLote ? 'lote.zip' : files[0].name;

        fileDownload(data, outputNameFile);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // TODO: setar aqui o tipo de erro em um state
        console.log('is blob:', error.response?.data instanceof Blob);

        if (error.response?.data instanceof Blob) {
          const dataJson = await error.response?.data.text();

          const errorResponseData = await JSON.parse(dataJson);

          setMessageError(errorResponseData.message);
        }

        console.log(JSON.stringify(error.response?.data, null, 2));
      }
    } finally {
      setLoading(false);
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
      <Container maxWidth="sm">
        <Typography variant="h4">Assinador</Typography>
        {messageError && <Typography>{messageError}</Typography>}
        <UserInfos />
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
    </Box>
  );
};

export default Home;
