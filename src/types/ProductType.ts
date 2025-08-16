export interface Product {
  Code?: number;
  GCode?: number;
  SCode?: number;
  Name?: string;
  GName?: string;
  SName?: string;
  SPrice?: number;
  Vahed?: string;
  Comment?: string;
  product_images?: ProductImage[];
  product_size_color?: ProductSizeColor[];
}

export interface ProductImage {
  PicName: string;
}

export interface ProductSizeColor {
  SCCode: string;
  ColorName: string;
  SizeNum: string;
  RGB: string;
  Mande: number;
  Mablag: number;
}

export interface ProductData {
  product: Product;
  relatedProducts: Product[];
  offeredProducts: Product[];
}

export interface CartItem {
  item: Product;
  basket: { feature: ProductSizeColor; quantity: number }[];
}