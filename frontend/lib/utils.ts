export function formatMoney(amount: number): string {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  })

  return formatter.format(amount / 100)
}
