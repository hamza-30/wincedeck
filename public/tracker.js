(function () {
  var script = document.currentScript;
  var projectId = new URLSearchParams(script.src.split("?")[1]).get("id");

  if (!projectId) {
    console.warn("WinceDeck: No project ID provided.");
    return;
  }

  var FIREBASE_URL =
    `https://firestore.googleapis.com/v1/projects/wincedeck/databases/(default)/documents/errors/` +
    projectId +
    "/logs";

  function sendError(data) {
    fetch(FIREBASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          message: { stringValue: data.message || "Unknown error" },
          source: { stringValue: data.source || "" },
          line: { integerValue: data.line || 0 },
          stack: { stringValue: data.stack || "" },
          url: { stringValue: data.url || "" },
          type: { stringValue: data.type || "javascript" },
          timestamp: { stringValue: new Date().toISOString() },
          projectId: { stringValue: projectId },
        },
      }),
    });
  }

  window.onerror = function (message, source, line, col, error) {
    sendError({
      message: message,
      source: source,
      line: line,
      stack: error ? error.stack : "",
      url: window.location.href,
      type: "javascript",
    });
  };

  window.addEventListener("unhandledrejection", function (event) {
    sendError({
      message: event.reason
        ? event.reason.message
        : "Unhandled Promise Rejection",
      source: "",
      line: 0,
      stack: event.reason ? event.reason.stack : "",
      url: window.location.href,
      type: "promise",
    });
  });

  console.log("WinceDeck: Tracking initialized for project " + projectId);
})();
