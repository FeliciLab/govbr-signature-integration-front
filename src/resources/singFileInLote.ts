import { api } from '../api';

interface SingFileInLoteProps {
  pdfs: File[];
  code: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

const signFileInLote = ({
  pdfs,
  code,
  onUploadProgress,
}: SingFileInLoteProps) => {
  const mulPartFormData = new FormData();

  for (let index = 0; index < pdfs.length; index++) {
    mulPartFormData.append('pdfs', pdfs[index]);
  }

  return api.post(`/signPdf/lote/${code}`, mulPartFormData, {
    headers: {
      'content-type': 'multipart/form-data;',
      Accept: 'application/zip',
    },
    responseType: 'blob',
    onUploadProgress,
  });
};

export default signFileInLote;
