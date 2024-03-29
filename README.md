# Govbr Signature Integration Front

**Govbr Signature Integration Front** é um projeto web desenvolvido pelo [Felicilab](https://sus.ce.gov.br/felicilab/) com o intuito de fazer a integração do sistema de assinaturas de documentos do [GOV.BR](https://www.gov.br/pt-br) com o Sistema Aberto de Gestão Unificada (SAGU) da [Escola de Saúde Pública do Ceará (ESP/CE)](https://www.esp.ce.gov.br/).

Essa integração irá proporcionar a automação da assinatura digital dos certificados expedidos pela Escola de Saúde Pública. Dessa forma, o **Felicilab** apoia a transformação digital nos processos de qualificação da força de trabalho do SUS no Ceará.

## ❤ Conheça o Felicilab ❤

![cover](.github/imgs/logo-felicilab.png?style=flat)

Criado em fevereiro de 2020, o **Felicilab** - Laboratório de Inovação do SUS no Ceará - representa hoje, para além de uma estrutura governamental, um **movimento**. Desde a origem, é inspirado pela emergência da Transformação Digital, o potencial da Governança Colaborativa e o propósito da Felicidade. Desenvolvendo soluções inovadoras para a saúde pública, mostrou-se uma estrutura essencial, deu respostas rápidas, efetivas e afetivas, para todo o Sistema de Saúde, de forma aberta, colaborativa e sustentável.

Tudo isso, com base em processos de governança colaborativa voltados para a transparência radical, apoiados em metodologias ágeis e que garantem a efetividade de nossas entregas.

## 🧰 Tecnologias usadas 🧰

<div>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="48px" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="48px" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" height="48px" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" height="48px" />
</div>

## 🔥 Variáveis de ambiente 🔥

Descrição das variáveis de ambiente que usamos nesse projeto:

- **VITE_REDIRECT_URI**: URL de redirecionamento usado para pela API do gov.br.
- **VITE_CLIENTE_ID**: Identificador do cliente pela API do gov.br.
- **VITE_SECRET**: Segredo usado pela API do gov.br.
- **VITE_SERVER_OAUTH**:  Caminho para o servidor OAUTH usado pela API do gov.br.
- **VITE_API_URI**: URI do endereço da API.

As variáveis **VITE_REDIRECT_URI**, **VITE_CLIENTE_ID** e **VITE_SERVER_OAUTH** podem ser
melhor entendidas lendo a [documentação de integração](https://manual-integracao-assinatura-eletronica.readthedocs.io/en/latest/iniciarintegracao.html)
. As outras variáveis são usadas como configurações obrigatórias desse projeto para configurar ambientes de homologação, produção e desenvolvimento.

## 🧪 Como testar 🧪

```shell
# Copiar arquivo de exemplo das variáveis de ambiente
cp .env.example .env
```

Em `env.example` temos as configurções necessárias para que a aplicação possa fazer as requsições para o ambiente de
staging.

Agora é só execultar o container com:

```shell
yarn
docker-compose up --build
```

Caso não queira executar usando o **docker**, você pode usar o seguinte comando:

```shell
yarn dev
```
