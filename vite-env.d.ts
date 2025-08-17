interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CDN_URL: string;
  readonly VITE_NO_IMAGE_URL: string;
  readonly VITE_CONTACT_INFO_ADDRESS: string;
  readonly VITE_CONTACT_INFO_PHONE: string;
  readonly VITE_CONTACT_INFO_EMAIL: string;
  readonly VITE_SOCIAL_MEDIA_WHATSAPP: string;
  readonly VITE_SOCIAL_MEDIA_TELEGRAM: string;
  readonly VITE_SOCIAL_MEDIA_INSTAGRAM: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_CONTACT_INFO_LATITUDE: string;
  readonly VITE_CONTACT_INFO_LONGITUDE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
