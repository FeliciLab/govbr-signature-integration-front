import { Button, Container, TextField } from "@mui/material";
import fileDownload from "js-file-download";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import signFile from "../../resources/singFile";
import singFileInLote from "../../resources/singFileInLote";
import getGovBrUri, { GetGovBrUriScope } from "../../utils/getGovBrUri";
import { Field, Options } from "./styles";

interface HomeFormData {
  pdfs: File[];
}

const Home: React.FC = () => {
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
    <Container maxWidth="sm">
      <h1>Assinador</h1>
      {code ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button variant="outlined" component="label">
            Upload do arquivo
            <input
              hidden
              type="file"
              accept="application/pdf"
              multiple={scope === "signature_session"}
              {...register("pdfs")}
            />
          </Button>
          <Options>
            <button type="submit">Enviar</button>
            <Link to="/">Voltar</Link>
          </Options>
        </form>
      ) : (
        <Options>
          <a href={getGovBrUri("sign")} onClick={() => setScope("sign")}>
            Assinatura um arquivo
          </a>
          <a
            href={getGovBrUri("signature_session")}
            onClick={() => setScope("signature_session")}
          >
            Assinatura arquivo em Lote
          </a>
        </Options>
      )}
    </Container>
  );
};

export default Home;
