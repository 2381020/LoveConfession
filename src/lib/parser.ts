export function sanitizePhone(input: string): string {
  return input.replace(/[^0-9]/g, "");
}

export function normalizePhone(input: string): string {
  const digits = input.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  return digits;
}
