export function formatCurrencyDisplay(amount: any): string {
  if (amount === null || amount === undefined) {
    return "۰";
  }
  if (typeof amount === "string" && !/\d/.test(amount)) {
    return amount;
  }
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  const formattedAmount = new Intl.NumberFormat("fa-IR", {
    minimumFractionDigits: 0,
  }).format(Math.floor(amount));
  return formattedAmount;
}

export function toPersianDigits(amount: string | number): string {
  if (amount === null || amount === undefined) {
    return "۰";
  }

  const str = amount.toString();
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return str
    .split("")
    .map((char) => {
      if (char >= "0" && char <= "9") {
        return persianDigits[parseInt(char)];
      }
      return char;
    })
    .join("");
}

export function dateToPersianDigits(dateString: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return dateString.replace(/\d/g, (digit) => persianDigits[digit]);
}

export const convertPersianNumbers = (str: any) => {
  if (!str) return "";
  return str
    .replace(/[۰-۹]/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d: any) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
};
