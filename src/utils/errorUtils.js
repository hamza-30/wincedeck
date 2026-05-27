export const getPagePath = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.pathname || "/";
  } catch {
    return url;
  }
};

export const getSource = (stackTrace) => {
  let splitTrace = stackTrace.split("/");
  return splitTrace[splitTrace.length - 1];
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
