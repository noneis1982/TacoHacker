"use client";

import { BackButton } from "@/components/BackButton";

export function Header() {
  return (
    <header
      className="border-b border-zinc-200/60 sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(150px)",
        WebkitBackdropFilter: "blur(150px)",
      }}
    >
      <div className="px-4 py-3 flex items-center">
        <BackButton className="mr-4" />
        <h1 className="text-xl font-extrabold gradient-text leading-tight tracking-tight">
          TacoHacker
        </h1>
      </div>
    </header>
  );
}
