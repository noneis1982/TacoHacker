"use client";

import useSWR from "swr";
import type { Store } from "@/types/store";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
};

export function useStores(zip: string | null) {
  const { data, error, isLoading } = useSWR<Store[]>(
    zip ? `/api/stores?zip=${zip}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return { stores: data, error: error?.message, isLoading };
}
