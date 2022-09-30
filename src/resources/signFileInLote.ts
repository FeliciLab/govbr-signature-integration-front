import api from "../api";

interface SignFileInLoteProps {
  pdfs: File[];
  code: string;
}

const signFileInLote = ({ pdfs, code }: SignFileInLoteProps) => {
  const mulPartFormData = new FormData();

  for (let index = 0; index < pdfs.length; index++) {
    mulPartFormData.append("pdfs", pdfs[index]);
  }

  return api.post(`/signPdf/lote/${code}`, mulPartFormData, {
    headers: {
      "content-type": "multipart/form-data;",
      Accept: "application/zip",
    },
    responseType: "blob",
  });
};

export default signFileInLote;
