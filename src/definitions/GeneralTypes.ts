export interface Banner {
  id?: string | number;
  image?: string;
  link?: string;
}

export interface DynamicBannerGroupProps {
  banners?: Banner[];
  start: number;
  end: number;
}