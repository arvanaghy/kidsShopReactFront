export function formatCurrencyDisplay(amount) {
    const formattedAmount = new Intl.NumberFormat('Fa-IR', {
        minimumFractionDigits: 0,
    }).format(Math.floor(amount));
    return formattedAmount;
}