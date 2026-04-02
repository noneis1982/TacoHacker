"use client";

import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header
      className="border-b border-zinc-200/60 sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(150px)",
        WebkitBackdropFilter: "blur(150px)",
      }}
    >
      {/* Back button pinned to left edge of window */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => router.push("/")}
          className="gradient-btn rounded-full flex items-center justify-center text-white text-xs font-bold
                     shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
          style={{ width: 48, height: 24 }}
        >
          &#8592;
        </button>
      </div>
      {/* Title aligned with main content */}
      <div className="mx-auto max-w-2xl px-4 py-3">
        <h1 className="text-xl font-extrabold gradient-text leading-tight tracking-tight">
          TacoHacker
        </h1>
      </div>
    </header>
  );
}
