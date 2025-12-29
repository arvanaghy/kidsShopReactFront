export const categoryImageModeSelector = (category: any) => {
  let imageSrcUrl = "";
  switch (import.meta.env.VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE) {
    case "product_image":
      imageSrcUrl = `${category?.PicName}`;
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
