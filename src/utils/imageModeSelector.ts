export const categoryImageModeSelector = (category: any) => {
  let imageSrcUrl = "";
  switch (import.meta.env.VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE) {
    case "product_image":
      imageSrcUrl = `${import.meta.env.VITE_CDN_URL}/products-image/webp/${
        category?.PicName
      }.webp`;
      break;
    case "original_image":
    default:
      imageSrcUrl = `${import.meta.env.VITE_CDN_URL}/category-images/webp/${
        category?.PicName
      }.webp`;
      break;
  }

  return imageSrcUrl;
};
