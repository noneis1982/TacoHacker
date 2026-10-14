"use client";

import { useState, type FormEvent } from "react";

interface ZipCodeFormProps {
  onSubmit: (zip: string) => void;
  isLoading: boolean;
}

export function ZipCodeForm({ onSubmit, isLoading }: ZipCodeFormProps) {
  const [zip, setZip] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = /^\d{5}$/.test(zip);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onSubmit(zip);
    }
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => {
            setTouched(false);
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
          }}
          className={`flex-1 rounded-full border bg-white px-5 py-3.5 text-base font-semibold
                     placeholder:text-zinc-300 placeholder:font-semibold focus:outline-none
                     focus:ring-4 transition-all
                     ${touched && !isValid
                       ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                       : "border-zinc-200 focus:border-purple-400 focus:ring-purple-500/10"
                     }`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="gradient-btn rounded-full px-8 py-3.5 text-base font-semibold text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </span>
          ) : (
            "Go"
          )}
        </button>
      </form>
      {touched && !isValid && (
        <p className="text-red-500 text-sm px-2">
          Please enter a valid 5-digit US zip code.
        </p>
      )}
    </div>
  );
}
