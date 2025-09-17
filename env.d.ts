interface ImportMetaEnv {
  VITE_CDN_URL: string;
  VITE_NO_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}