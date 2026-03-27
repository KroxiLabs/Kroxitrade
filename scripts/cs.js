chrome.runtime.sendMessage({ type: "KROX_START_SCRIPT" });

const pending = new Map();
let reqId = 0;
window.addEventListener("message", (e) => {
    if (e.source !== window) return;
    const d = e.data;
    if (!d || d.source !== "KROX_BG_SCRIPT") return;

    if (d.type === "KROX_READY") {
        console.log("KROX_READY received");
    } else if (d.type === "KROX_RESPONSE") {
        const { id, result, error } = d;
        const p = pending.get(id);
        if (p) {
            if (error) {
                p.reject(error);
            } else {
                p.resolve(result);
            }
            pending.delete(id);
        }
    }
}); 