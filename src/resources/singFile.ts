import api from '../api';

interface SingFileProps {
  pdf: File;
  code: string;
}

const singFile = ({ pdf, code }: SingFileProps) => {
  const mulPartFormData = new FormData();

  mulPartFormData.append('pdf', pdf);

  return api.post(`/signPdf/${code}`, mulPartFormData, {
    headers: {
      'content-type': 'multipart/form-data;',
      Accept: 'application/pdf',
    },
    responseType: 'blob',
  });
};

export default singFile;
