"use client";

import useSWR from "swr";
import type { StoreMenu } from "@/types/menu";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
};

export function useMenu(storeId: string | null) {
  const { data, error, isLoading } = useSWR<StoreMenu>(
    storeId ? `/api/menu/${storeId}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return { menu: data, error: error?.message, isLoading };
}
