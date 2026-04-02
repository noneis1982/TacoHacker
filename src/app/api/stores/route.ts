import { NextRequest, NextResponse } from "next/server";
import { geocodeZip } from "@/lib/geocode";
import { findStores } from "@/lib/tacobell/stores";
import { getStoreCache, setStoreCache } from "@/lib/cache";
import type { Store } from "@/types/store";

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get("zip");
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Valid 5-digit zip code required" },
      { status: 400 }
    );
  }

  // Check cache
  const cacheKey = `stores:${zip}`;
  const cached = getStoreCache<Store[]>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  }

  try {
    const { lat, lng } = await geocodeZip(zip);
    const stores = await findStores(lat, lng);

    if (stores.length === 0) {
      return NextResponse.json(
        { error: "No Taco Bell locations found near that zip code" },
        { status: 404 }
      );
    }

    setStoreCache(cacheKey, stores);
    return NextResponse.json(stores, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to find stores";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
