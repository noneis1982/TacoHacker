import type { Store } from "@/types/store";
import { tbFetchJSON } from "./client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function findStores(lat: number, lng: number): Promise<Store[]> {
  const path = `/tacobellwebservices/v2/tacobell/stores?latitude=${lat}&longitude=${lng}&radius=10`;
  const res = await tbFetchJSON(path);

  if (!res.ok) {
    throw new Error(`Store finder returned ${res.status}`);
  }

  const data: any = await res.json();
  const rawStores: any[] = data?.nearByStores || [];

  return rawStores
    .filter((s: any) => s.storeNumber)
    .slice(0, 10)
    .map((s: any) => {
      const addr = s.address || {};
      const distance = parseFloat(
        (s.formattedDistance || "0").replace(/[^0-9.]/g, "")
      );
      return {
        id: s.storeNumber,
        name: `Taco Bell #${s.storeNumber}`,
        address: addr.line1 || "",
        city: addr.town || "",
        state: (addr.region?.isocode || "").replace("US-", ""),
        zip: addr.postalCode || "",
        lat: 0, // TB doesn't return coords in this response
        lng: 0,
        distanceMiles: distance,
      };
    });
}
