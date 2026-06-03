export const getPagePath = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.pathname || "/";
  } catch {
    return url;
  }
};

export const getSource = (stackTrace) => {
  if (!stackTrace) return "Unknown";

  const match = stackTrace.match(/(?:at .+?\()?(https?:\/\/.+?):(\d+):(\d+)/);

  if (!match) return "Unknown";

  const filePath = match[1];
  const line = match[2];
  const col = match[3];

  const fileName = filePath.split("/").pop().split("?")[0];

  return `${fileName}:${line}:${col}`;
};

export const getSeverity = (message, type = "javascript") => {
  if (!message) return "ERROR";

  const lowerCaseMsg = String(message).toLowerCase();

  if (
    type === "promise" ||
    lowerCaseMsg.includes("unhandledrejection") ||
    lowerCaseMsg.includes("promise") ||
    lowerCaseMsg.includes("fetch")
  ) {
    return "PROMISE REJECTION";
  }

  if (lowerCaseMsg.includes("warning") || lowerCaseMsg.includes("deprecated")) {
    return "WARNING";
  }

  if (
    lowerCaseMsg.includes("error") ||
    lowerCaseMsg.includes("exception") ||
    lowerCaseMsg.includes("fail") ||
    lowerCaseMsg.includes("timeout") ||
    lowerCaseMsg.includes("network")
  ) {
    return "ERROR";
  }

  return "ERROR";
};

export const getSeverityColor = (severity) => {
  switch (severity) {
    case "ERROR":
      return "text-red-500";
    case "WARNING":
      return "text-amber-500";
    case "PROMISE REJECTION":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
};

export const getClockTime = (time) => {
  return time.split("T")[1].slice(0, 8);
};
