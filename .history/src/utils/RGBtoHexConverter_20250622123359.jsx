export const RGBtoHexConverter = (rgbString) => {
  // Remove parentheses and split the string into components
  const rgbValues = rgbString
    .replace(/[()]/g, '')
    .split(',')
    .map(value => parseInt(value.trim(), 10));
  
  // Convert each RGB component to hex
  const r = rgbValues[0].toString(16).padStart(2, '0');
  const g = rgbValues[1].toString(16).padStart(2, '0');
  const b = rgbValues[2].toString(16).padStart(2, '0');
  
  // Return the hex color code
  return `#${r}${g}${b}`