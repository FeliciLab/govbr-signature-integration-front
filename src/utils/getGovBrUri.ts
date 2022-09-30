import govBrConfig from "../configs/govBrConfig";

type GetGovBrUriScope = "sign" | "signature_session";

const getGovBrUri = (scope: GetGovBrUriScope) => {
  const { clientId, redirectUri, servidorOauth } = govBrConfig;

  // const base64RedirectUri = btoa(encodeURIComponent(redirectUri));

  return `https://${servidorOauth}/authorize?response_type=code&redirect_uri=${redirectUri}&scope=${scope}&client_id=${clientId}`;
};

export default getGovBrUri;
