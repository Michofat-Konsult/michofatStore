export type CartLine = { id: string; quantity: number };
export function sanitizeCart(
  value: unknown,
  stock: Record<string, number>,
): CartLine[] {
  if (!Array.isArray(value)) return [];
  const result: CartLine[] = [];
  for (const item of value)
    if (
      item &&
      typeof item.id === "string" &&
      stock[item.id] &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      !result.some((line) => line.id === item.id)
    )
      result.push({
        id: item.id,
        quantity: Math.min(item.quantity, stock[item.id]),
      });
  return result;
}
export function deliveryCost(subtotal: number, physical: boolean) {
  return !physical || subtotal >= 500000 ? 0 : 5000;
}
