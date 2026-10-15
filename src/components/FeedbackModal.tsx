"use client";

import { useEffect, useState } from "react";

// Bump this when you ship a notable update — returning visitors who haven't
// acknowledged THIS version will see the "welcome back / what's new" modal again.
const UPDATE_VERSION = "v1-2026-10";

const VISITED_KEY = "th_visited";
const UPDATE_ACK_KEY = "th_update_ack";

// TEMPORARY preview flag — shows the modal on every load regardless of state.
// MUST be set back to false before shipping to production.
const FORCE_SHOW = false;

// Where the "Share feedback" button goes. Set NEXT_PUBLIC_FEEDBACK_URL to a
// Google Form (or similar) for the best experience; falls back to email.
const FEEDBACK_URL =
  process.env.NEXT_PUBLIC_FEEDBACK_URL ||
  "mailto:contact@tacohacker.com?subject=TacoHacker%20Feedback";

/**
 * Returning-visitor feedback/education modal.
 *
 * - First visit: records the visit, shows nothing.
 * - Later visits: shows once per UPDATE_VERSION, inviting feedback.
 *
 * Gated entirely on localStorage, so there's no cookie-consent requirement.
 */
export function FeedbackModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Force-show for previewing: the temporary FORCE_SHOW flag, or ?feedback=1 in the URL.
    const forcedByUrl =
      new URLSearchParams(window.location.search).get("feedback") === "1";
    if (FORCE_SHOW || forcedByUrl) {
      setOpen(true);
      return;
    }
    try {
      const visited = localStorage.getItem(VISITED_KEY);
      if (!visited) {
        // First time here — don't interrupt; just remember them for next time.
        localStorage.setItem(VISITED_KEY, "1");
        return;
      }
      const ack = localStorage.getItem(UPDATE_ACK_KEY);
      if (ack !== UPDATE_VERSION) {
        setOpen(true);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — just skip the modal.
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(UPDATE_ACK_KEY, UPDATE_VERSION);
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full
                     text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 text-2xl leading-none transition-colors"
        >
          &times;
        </button>

        <h2
          id="feedback-title"
          className="type-display gradient-text"
        >
          Welcome back!
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600 text-pretty">
          We&apos;re actively improving TacoHacker and adding new hacks. Got a
          request, found a bug, or know a menu hack we should add?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          We&apos;d love to hear from you.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="w-full rounded-full gradient-btn py-3 text-center text-sm font-bold text-white
                       shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all"
          >
            Share feedback
          </a>
          <button
            onClick={dismiss}
            className="w-full py-2 text-center text-sm font-medium text-zinc-400 hover:text-zinc-600"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
