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

## 🧪 Como testar 🧪

```shell
# Copiar arquivo de exemplo das variáveis de ambiente
cp .env.exemple .env
```

Em `env.exemple` temos as configurções necessárias para que a aplicação possa fazer as requsições para o ambiente de
staging.

Agora é só execultar o container com:

```shell
docker-compose up --build
```

A partir daqui, use as regras contidas no manual de integraçao do gov.br para fazer a requisição para gerar o CODE (vide
a documentação).
