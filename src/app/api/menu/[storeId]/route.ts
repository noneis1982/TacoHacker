import { NextRequest, NextResponse } from "next/server";
import { fetchStoreMenu } from "@/lib/tacobell/menu";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await params;
  if (!storeId) {
    return NextResponse.json(
      { error: "Store ID required" },
      { status: 400 }
    );
  }

  try {
    const menu = await fetchStoreMenu(storeId);
    return NextResponse.json(menu, {
      headers: {
        "Cache-Control": "public, max-age=21600, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch menu";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
