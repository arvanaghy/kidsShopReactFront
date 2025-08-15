export const RGBtoHexConverter = (rgbString: string | null): string | null => {
  if (!rgbString || rgbString?.length <= 0) return null;
  const rgbValues = rgbString
    ?.replace(/[()]/g, "")
    ?.split(",")
    ?.map((value) => parseInt(value.trim(), 10));

  if (rgbValues?.length !== 3) return null;

  const r = rgbValues[0].toString(16).padStart(2, "0");
  const g = rgbValues[1].toString(16).padStart(2, "0");
  const b = rgbValues[2].toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};
