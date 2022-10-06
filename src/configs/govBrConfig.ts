const govBrConfig = {
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  clientId: import.meta.env.VITE_CLIENTE_ID,
  secret: import.meta.env.VITE_SECRET,
  servidorOauth: import.meta.env.VITE_SERVER_OAUTH,
};

export default govBrConfig;
