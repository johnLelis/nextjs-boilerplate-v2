export const parseUserAgent = (
  userAgent?: string | null
): {
  browser: string;
  os: string;
} => {
  if (!userAgent) return { browser: "Unknown", os: "Unknown" };

  const browser = userAgent.includes("Chrome")
    ? "Chrome"
    : userAgent.includes("Firefox")
      ? "Firefox"
      : userAgent.includes("Safari")
        ? "Safari"
        : "Unknown";

  const os = userAgent.includes("Windows")
    ? "Windows"
    : userAgent.includes("Mac")
      ? "macOS"
      : userAgent.includes("Linux")
        ? "Linux"
        : "Unknown";

  return { browser, os };
};
