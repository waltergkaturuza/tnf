/** Build a WhatsApp click-to-chat link from a local or international number. */
export function whatsappHref(display: string, prefilledMessage?: string): string {
  const digits = display.replace(/\D/g, "");
  const international = digits.startsWith("263")
    ? digits
    : digits.startsWith("0")
      ? `263${digits.slice(1)}`
      : digits;

  const base = `https://wa.me/${international}`;
  if (!prefilledMessage?.trim()) return base;
  return `${base}?text=${encodeURIComponent(prefilledMessage.trim())}`;
}
