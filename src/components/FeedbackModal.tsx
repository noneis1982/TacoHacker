"use client";

import { useEffect, useState } from "react";

// Bump when you ship a notable update — returning visitors who haven't
// acknowledged THIS version see the modal again (unless they already submitted).
const UPDATE_VERSION = "v1-2026-10";

const VISITED_KEY = "th_visited";
const UPDATE_ACK_KEY = "th_update_ack";
const SUBMITTED_KEY = "th_feedback_submitted";

// TEMPORARY preview flag — shows the modal on every load. Set false before shipping.
const FORCE_SHOW = false;

/**
 * Google Form wiring.
 *
 * Create a Google Form with these four questions IN THIS ORDER:
 *   1. How useful is TacoHacker?          (Linear scale 1–5, or short answer)
 *   2. What should we add next?           (Paragraph)
 *   3. Did anything not work?             (Paragraph)
 *   4. Anything else?                     (Paragraph)
 *
 * Then: Form → ⋮ → "Get pre-filled link", fill dummy values, copy the link, and
 * read each `entry.XXXXXXX` id from it. Paste the formResponse URL + ids below.
 */
const FEEDBACK_FORM = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe9ijE3GTb7F2Fk_m7Q5lP-fMdRUn1j-3YtFdTE-gQ6sOHuxA/formResponse",
  fields: {
    rating: "entry.100589953",
    addNext: "entry.885858370",
    notWorking: "entry.1371347201",
    other: "entry.68466577",
  },
};
const FORM_READY = Boolean(FEEDBACK_FORM.actionUrl && FEEDBACK_FORM.fields.rating);

type Step = "ask" | "form";

export function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("ask");
  const [rating, setRating] = useState<number | null>(null);
  const [addNext, setAddNext] = useState("");
  const [notWorking, setNotWorking] = useState("");
  const [other, setOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const forcedByUrl =
      new URLSearchParams(window.location.search).get("feedback") === "1";
    if (FORCE_SHOW || forcedByUrl) {
      setOpen(true);
      return;
    }
    try {
      if (localStorage.getItem(SUBMITTED_KEY)) return; // never nag past submitters
      const visited = localStorage.getItem(VISITED_KEY);
      if (!visited) {
        localStorage.setItem(VISITED_KEY, "1");
        return;
      }
      if (localStorage.getItem(UPDATE_ACK_KEY) !== UPDATE_VERSION) {
        setOpen(true);
      }
    } catch {
      /* localStorage unavailable — skip */
    }
  }, []);

  const ackUpdate = () => {
    try {
      localStorage.setItem(UPDATE_ACK_KEY, UPDATE_VERSION);
    } catch {
      /* ignore */
    }
  };

  const dismiss = () => {
    ackUpdate();
    setOpen(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (FORM_READY) {
        const body = new URLSearchParams();
        if (rating != null) body.append(FEEDBACK_FORM.fields.rating, String(rating));
        if (addNext) body.append(FEEDBACK_FORM.fields.addNext, addNext);
        if (notWorking) body.append(FEEDBACK_FORM.fields.notWorking, notWorking);
        if (other) body.append(FEEDBACK_FORM.fields.other, other);
        await fetch(FEEDBACK_FORM.actionUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      }
      try {
        localStorage.setItem(SUBMITTED_KEY, "1");
        ackUpdate();
      } catch {
        /* ignore */
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const canSubmit = rating != null || addNext || notWorking || other;

  const closeButton = (
    <button
      onClick={dismiss}
      aria-label="Close"
      className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full
                 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 text-2xl leading-none transition-colors z-10"
    >
      &times;
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <button
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl flex flex-col max-h-[80vh]">
        {closeButton}

        {submitted ? (
          <div className="p-6 py-8 text-center">
            <h2 className="type-display">
              <span className="gradient-text">Thanks!</span> 🌮
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              We appreciate you helping make TacoHacker better.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-full gradient-btn py-3 text-sm font-bold text-white
                         shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all"
            >
              Close
            </button>
          </div>
        ) : step === "ask" ? (
          /* Step 1 — invitation */
          <div className="p-6">
            <h2 id="feedback-title" className="type-display gradient-text">
              Welcome back!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 text-pretty">
              We&apos;re actively improving TacoHacker. Got a minute to share
              some quick feedback?
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => setStep("form")}
                className="w-full rounded-full gradient-btn py-3 text-center text-sm font-bold text-white
                           shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all"
              >
                Sure, let&apos;s go
              </button>
              <button
                onClick={dismiss}
                className="w-full py-2 text-center text-sm font-medium text-zinc-400 hover:text-zinc-600"
              >
                No thanks
              </button>
            </div>
          </div>
        ) : (
          /* Step 2 — the form (compact header + scrollable body + fixed footer) */
          <>
            <div className="px-6 pt-6 pb-3 border-b border-zinc-100">
              <h2 className="type-display gradient-text">Quick feedback</h2>
            </div>

            <div className="overflow-y-auto px-6 py-4 space-y-4">
              <div>
                <label className="type-subtitle text-zinc-500">
                  How useful is TacoHacker?
                </label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`h-10 flex-1 rounded-full border type-pill transition-all ${
                        rating === n
                          ? "gradient-btn text-white border-transparent"
                          : "bg-white border-zinc-200 text-zinc-500 hover:border-purple-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="type-subtitle text-zinc-500">
                  What should we add next?
                </label>
                <textarea
                  value={addNext}
                  onChange={(e) => setAddNext(e.target.value)}
                  rows={2}
                  className="mt-2 w-full rounded-xl border border-zinc-200 p-3 text-sm
                             focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10"
                  placeholder="Menu items, chains, features…"
                />
              </div>

              <div>
                <label className="type-subtitle text-zinc-500">
                  Did anything not work?
                </label>
                <textarea
                  value={notWorking}
                  onChange={(e) => setNotWorking(e.target.value)}
                  rows={2}
                  className="mt-2 w-full rounded-xl border border-zinc-200 p-3 text-sm
                             focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10"
                  placeholder="A wrong price, a broken hack, a store issue…"
                />
              </div>

              <div>
                <label className="type-subtitle text-zinc-500">Anything else?</label>
                <textarea
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  rows={2}
                  className="mt-2 w-full rounded-xl border border-zinc-200 p-3 text-sm
                             focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10"
                  placeholder="Anything on your mind"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex flex-col gap-2">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full rounded-full gradient-btn py-3 text-center text-sm font-bold text-white
                           shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
