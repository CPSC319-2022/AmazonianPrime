export function costToString(cost: number) {
  return cost.toString().includes('.') ? cost.toString() : cost.toString() + '.00';
}
