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

export const getSeverity = (message) => {
  if (message.toLowerCase().includes("error")) {
    return "ERROR";
  } else if (message.toLowerCase().includes("warning")) {
    return "WARNING";
  }
};

export const getClockTime = (time) => {
  return time.split("T")[1].slice(0, 8);
};
