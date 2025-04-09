export function formatCurrencyDisplay(amount) {
  const formattedAmount = new Intl.NumberFormat("Fa-IR", {
    minimumFractionDigits: 0,
  }).format(Math.floor(amount));
  return formattedAmount;
}

export function toPersianDigits(input) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/\d/g, (d) => persianDigits[d]);
}
