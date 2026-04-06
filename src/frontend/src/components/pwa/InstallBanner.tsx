import { useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

export function InstallBanner() {
  const { isInstallable, isInstalled, triggerInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || isInstalled || !isInstallable) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
      style={{ fontFamily: "sans-serif" }}
    >
      <div
        className="rounded-2xl shadow-2xl p-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* App Icon */}
        <img
          src="/assets/generated/icon-192x192.dim_192x192.png"
          alt="App Icon"
          className="w-12 h-12 rounded-xl flex-shrink-0"
          style={{ objectFit: "cover" }}
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight">
            ANSHIKA UDHYOG GROUP™
          </p>
          <p className="text-green-200 text-xs mt-0.5">
            App install karo - Free!
          </p>
        </div>

        {/* Install Button */}
        <button
          type="button"
          onClick={triggerInstall}
          className="flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95"
          style={{
            background: "white",
            color: "#166534",
          }}
        >
          Install
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-green-200 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.15)" }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Small install button for Header
export function InstallHeaderButton() {
  const { isInstallable, isInstalled, triggerInstall } = useInstallPrompt();

  if (isInstalled || !isInstallable) return null;

  return (
    <button
      type="button"
      onClick={triggerInstall}
      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
      style={{
        background: "rgba(255,255,255,0.15)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.3)",
      }}
      title="App Install Karo"
      aria-label="Install app"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Install app"
        role="img"
      >
        <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
        <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
      </svg>
      App Install
    </button>
  );
}
