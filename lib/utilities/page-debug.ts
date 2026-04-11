export const emitPageDebug = (label: string, payload?: unknown) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.postMessage(
      {
        source: "poe-trade-plus-debug",
        label,
        payload
      },
      "*"
    );
  } catch {
    // Ignore debug relay errors.
  }
};
