export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export function parseDeviceType(userAgent: string | null | undefined): DeviceType {
  if (!userAgent) return "unknown";

  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/.test(ua)) return "mobile";
  if (/windows|macintosh|linux|cros/.test(ua)) return "desktop";
  return "unknown";
}
