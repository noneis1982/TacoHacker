"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  /** Where to navigate. Defaults to home. */
  href?: string;
  /** Extra classes (e.g. margins) from the caller. */
  className?: string;
}

/**
 * The single, shared back button used across the app.
 * A 48px-tall gradient pill with a back arrow.
 */
export function BackButton({ href = "/", className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      aria-label="Back"
      className={`flex items-center justify-center shrink-0 active:scale-95 transition-all ${className}`}
      // 48px-tall hit target, but the visible pill inside is only 24px tall.
      style={{ width: 56, height: 48 }}
    >
      <span
        className="gradient-btn rounded-full flex items-center justify-center text-white
                   shadow-lg shadow-purple-500/20"
        style={{ width: 48, height: 24 }}
      >
        <span className="text-sm leading-none">&#8592;</span>
      </span>
    </button>
  );
}
