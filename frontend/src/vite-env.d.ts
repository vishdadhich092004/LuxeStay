/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_DOMAIN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
