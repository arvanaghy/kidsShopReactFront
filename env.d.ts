interface ImportMetaEnv {
  VITE_CDN_URL: string;
  VITE_NO_IMAGE_URL: string;
  VITE_CONTACT_INFO_ADDRESS: string;
  VITE_CONTACT_INFO_PHONE: string;
  VITE_CONTACT_INFO_EMAIL: string;
  VITE_SOCIAL_MEDIA_WHATSAPP: string;
  VITE_SOCIAL_MEDIA_TELEGRAM: string;
  VITE_SOCIAL_MEDIA_INSTAGRAM: string;
  VITE_APP_NAME: string;
  VITE_CONTACT_INFO_LATITUDE: string;
  VITE_CONTACT_INFO_LONGITUDE: string;
  VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}