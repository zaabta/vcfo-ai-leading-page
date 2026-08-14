/**
 * WhatsApp sales links.
 *
 * NEXT_PUBLIC_SALES_WHATSAPP_NUMBER is intentionally public (it is a sales
 * contact, not a secret). Private keys must never be prefixed with
 * NEXT_PUBLIC_ and never appear in this file.
 */
export const SALES_WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_SALES_WHATSAPP_NUMBER ?? "").replace(
  /\D/g,
  "",
);

export const WHATSAPP_MESSAGES = {
  getStarted: "مرحبًا، أريد معرفة المزيد عن Financial Truth Engine والبدء باستخدام المنصة.",
  demo: "مرحبًا، أرغب في حجز عرض توضيحي لـ Financial Truth Engine.",
  sales: "مرحبًا، أريد التحدث مع فريق المبيعات حول Financial Truth Engine.",
} as const;

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${SALES_WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
