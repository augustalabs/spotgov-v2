// WARNING: NOT SURE IF THIS IS THE CORRECT IMPLEMENTATION
export function validatePortugalNif(nif: string | null) {
  if (nif === null) return true;

  const regex = /^[1235689]\d{8}$/;

  if (!regex.test(nif)) return false;

  // Calculate control digit
  const numbers = nif.split("").map(Number);
  const sum = numbers
    .slice(0, 8)
    .reduce((acc, value, index) => acc + value * (9 - index), 0);
  const controlDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return controlDigit === numbers[8];
}
