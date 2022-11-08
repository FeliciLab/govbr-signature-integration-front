import { api } from '../api';

interface SingFileProps {
  pdf: File;
  code: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

const singFile = ({ pdf, code, onUploadProgress }: SingFileProps) => {
  const mulPartFormData = new FormData();

  mulPartFormData.append('pdf', pdf);

  return api.post(`/signPdf/${code}`, mulPartFormData, {
    headers: {
      'content-type': 'multipart/form-data;',
      Accept: 'application/pdf',
    },
    responseType: 'blob',
    onUploadProgress,
  });
};

export default singFile;
