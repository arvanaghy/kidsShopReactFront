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

export function toPersianDigits(amount: any): string {
  if (amount === null || amount === undefined) {
    return "۰";
  }
  if (typeof amount === "string" && !/\d/.test(amount)) {
    return amount;
  }
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return amount.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}
