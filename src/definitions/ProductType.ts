export interface ProductProps {
  CodeCompany?: number;
  CanSelect?: number;
  GCode?: number;
  GName?: string;
  Comment?: string;
  SCode?: number;
  SName?: string;
  Code?: number;
  Name?: string;
  Model?: string;
  UCode?: number;
  Vahed?: string;
  KMegdar?: number;
  KPrice?: number;
  SPrice?: number;
  KhordePrice?: number;
  OmdePrice?: number;
  HamkarPrice?: number;
  AgsatPrice?: number;
  CheckPrice?: number;
  DForoosh?: number;
  CShowInDevice?: number;
  CFestival?: number;
  GPoint?: number;
  KVahed?: number;
  PicName?: string;
  product_images?: ProductImageProps[];
  product_size_color?: ProductSizeColorProps[];
}

export interface ProductImageProps {
  CodeKala: number;
  PicName: string;
  Pic: string;
  Def: number;
}

export interface ProductSizeColorProps {
  SCCode: string;
  CodeKala: number;
  ColorName: string;
  SizeNum: string;
  RGB: string;
  Mande: number;
  Mablag: number;
}

export interface ProductData {
  product: ProductProps;
  relatedProducts: ProductProps[];
  offeredProducts: ProductProps[];
}

export interface CartItem {
  item: ProductProps;
  basket: { feature: ProductSizeColorProps; quantity: number }[];
}
