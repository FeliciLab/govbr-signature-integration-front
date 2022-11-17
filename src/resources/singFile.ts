import { AxiosResponse } from 'axios';
import { api, ApiError } from '../api';

interface SingFileProps {
  pdf: File;
  code: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

const singFile = ({
  pdf,
  code,
  onUploadProgress,
}: SingFileProps): Promise<AxiosResponse<Blob, ApiError>> => {
  const mulPartFormData = new FormData();

  mulPartFormData.append('pdf', pdf);

  return api.post<Blob>(`/signPdf/${code}`, mulPartFormData, {
    headers: {
      'content-type': 'multipart/form-data;',
      Accept: 'application/pdf, application/json',
    },
    responseType: 'blob',
    onUploadProgress,
  });
};

export default singFile;
