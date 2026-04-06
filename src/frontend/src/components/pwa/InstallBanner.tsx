import { useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

function IOSInstallModal({ onClose }: { onClose: () => void }) {
  return (
    <dialog
      open
      className="fixed inset-0 z-[200] w-full h-full border-0 p-0 m-0"
      style={{
        background: "rgba(0,0,0,0.6)",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
      onClose={onClose}
    >
      <div className="flex items-end justify-center h-full p-4">
        <div
          className="w-full max-w-sm rounded-2xl p-5"
          style={{ background: "#fff" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/generated/aug-round-logo-192.dim_192x192.png"
              alt="AUG Logo"
              className="w-14 h-14 rounded-2xl"
              style={{ objectFit: "cover" }}
            />
            <div>
              <p className="font-bold text-green-900 text-base">
                ANSHIKA UDHYOG GROUP™
              </p>
              <p className="text-green-700 text-xs">
                iPhone/iPad pe install karein
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">1️⃣</span>
              <p>
                Neeche Share button tap karein{" "}
                <span className="inline-block text-base">⬆️</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">2️⃣</span>
              <p>
                Scroll karein aur <strong>"Add to Home Screen"</strong> tap
                karein
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">3️⃣</span>
              <p>
                <strong>"Add"</strong> tap karein — App install ho jayegi!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: "#166534" }}
          >
            Samajh Gaya ✓
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function InstallBanner() {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isIOSInstallable,
    triggerInstall,
  } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const shouldShow =
    !dismissed && !isInstalled && (isInstallable || isIOSInstallable);

  return (
    <>
      {showIOSModal && (
        <IOSInstallModal onClose={() => setShowIOSModal(false)} />
      )}

      {shouldShow && (
        <div
          className="fixed bottom-16 left-3 right-3 z-[100] mx-auto max-w-sm"
          style={{ fontFamily: "sans-serif" }}
        >
          <div
            className="rounded-2xl shadow-2xl p-4"
            style={{
              background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/aug-round-logo-192.dim_192x192.png"
                alt="App Icon"
                className="w-12 h-12 rounded-xl flex-shrink-0"
                style={{ objectFit: "cover" }}
              />

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">
                  ANSHIKA UDHYOG GROUP™
                </p>
                <p className="text-green-200 text-xs mt-0.5">
                  📱 Mobile App install karein — Free!
                </p>
              </div>

              <button
                type="button"
                onClick={isIOS ? () => setShowIOSModal(true) : triggerInstall}
                className="flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95"
                style={{ background: "white", color: "#166534" }}
              >
                📥 Install
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-green-200 hover:text-white transition-colors text-lg"
                style={{ background: "rgba(255,255,255,0.15)" }}
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Small install button for Header
export function InstallHeaderButton() {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isIOSInstallable,
    triggerInstall,
  } = useInstallPrompt();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) return null;
  if (!isInstallable && !isIOSInstallable) return null;

  return (
    <>
      {showIOSModal && (
        <IOSInstallModal onClose={() => setShowIOSModal(false)} />
      )}

      <button
        type="button"
        onClick={isIOS ? () => setShowIOSModal(true) : triggerInstall}
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
          aria-hidden="true"
        >
          <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
          <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
        </svg>
        📱 App Install
      </button>
    </>
  );
}
