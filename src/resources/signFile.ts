import api from "../api";

interface SignFileProps {
  pdf: File;
  code: string;
}

const signFile = ({ pdf, code }: SignFileProps) => {
  const mulPartFormData = new FormData();

  mulPartFormData.append("pdf", pdf);

  return api.post(`/signPdf/${code}`, mulPartFormData, {
    headers: {
      "content-type": "multipart/form-data;",
      Accept: "application/pdf",
    },
    responseType: "blob",
  });
};

export default signFile;
