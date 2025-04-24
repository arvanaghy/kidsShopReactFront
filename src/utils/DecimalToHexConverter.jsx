export const DecimalToHexConverter = (decimal) => {
    if (!decimal && decimal !== 0) return "";
    const num = parseInt(decimal);
    if (isNaN(num) || num < 0 || num > 16777215) return "";
  
    const r = Math.floor(num / 65536);
    const g = Math.floor((num % 65536) / 256);
    const b = num % 256;
  
    const toHex = (n) => {
      const hex = n.toString(16).toUpperCase();
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };