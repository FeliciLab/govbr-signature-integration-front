import fileDownload from "js-file-download";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import signFile from "../../resources/signFile";
import signFileInLote from "../../resources/signFileInLote";
import getGovBrUri from "../../utils/getGovBrUri";
import { Container, Field, Options } from "./styles";

interface HomeFormData {
  pdfs: File[];
}

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const { register, handleSubmit } = useForm<HomeFormData>();

  const onSubmit = async ({ pdfs }: HomeFormData) => {
    if (code) {
      const inLote = pdfs.length > 1;

      const signPdfsPromise = inLote
        ? signFileInLote({ pdfs, code })
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
    <Container>
      <h1>Assinador</h1>
      {code ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <label htmlFor="pdf">Arquivo</label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              {...register("pdfs")}
            />
          </Field>
          <Options>
            <button type="submit">Enviar</button>
            <Link to="/">Voltar</Link>
          </Options>
        </form>
      ) : (
        <Options>
          <a href={getGovBrUri("sign")}>Assinatura um arquivo</a>
          <a href={getGovBrUri("signature_session")}>
            Assinatura arquivo em Lote
          </a>
        </Options>
      )}
    </Container>
  );
};

export default Home;
