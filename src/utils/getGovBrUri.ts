import govBrConfig from "../configs/govBrConfig";

export type GetGovBrUriScope = "sign" | "signature_session";

const getGovBrUri = (scope: GetGovBrUriScope) => {
  const { clientId, redirectUri, servidorOauth } = govBrConfig;

  return `https://${servidorOauth}/authorize?response_type=code&redirect_uri=${redirectUri}&scope=${scope}&client_id=${clientId}`;
};

export default getGovBrUri;
