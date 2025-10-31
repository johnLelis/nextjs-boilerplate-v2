export const parseUserAgent = (
  userAgent?: string | null
): { browser: string; os: string } => {
  if (!userAgent) return { browser: "Unknown", os: "Unknown" };

  const browser = getBrowserName(userAgent);
  const os = getOSName(userAgent);

  return { browser, os };
};

const getBrowserName = (ua: string): string => {
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};

const getOSName = (ua: string): string => {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
};
