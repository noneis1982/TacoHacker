import { NextRequest, NextResponse } from "next/server";
import { fetchStoreMenu } from "@/lib/tacobell/menu";
import { optimize } from "@/lib/optimizer/engine";
import type { OptimizeRequest, OptimizeResponse } from "@/types/optimizer";

export async function POST(req: NextRequest) {
  let body: OptimizeRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { storeId, desiredIngredientCodes, itemType } = body;
  if (!storeId || !Array.isArray(desiredIngredientCodes) || desiredIngredientCodes.length === 0) {
    return NextResponse.json(
      { error: "storeId and desiredIngredientCodes[] required" },
      { status: 400 }
    );
  }

  try {
    const menu = await fetchStoreMenu(storeId);
    const results = optimize(menu, desiredIngredientCodes, itemType || "any");

    const response: OptimizeResponse = {
      results,
      timestamp: Date.now(),
    };

    return NextResponse.json(response);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Optimization failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
