export function sanitizePhone(input: string): string {
  return input.replace(/[^0-9]/g, "");
}
