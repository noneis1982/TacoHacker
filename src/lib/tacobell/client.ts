import { TB_BASE_URL, TB_HEADERS } from "./constants";

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function tbFetch(path: string): Promise<Response> {
  const url = path.startsWith("http") ? path : `${TB_BASE_URL}${path}`;
  return fetch(url, { headers: TB_HEADERS });
}

export async function tbFetchJSON(path: string): Promise<Response> {
  const url = path.startsWith("http") ? path : `${TB_BASE_URL}${path}`;
  return fetch(url, {
    headers: {
      ...TB_HEADERS,
      Accept: "application/json, text/plain, */*",
    },
  });
}

// Extract __NEXT_DATA__ JSON from a TB HTML page
export async function tbFetchNextData(path: string): Promise<Record<string, unknown> | null> {
  const res = await tbFetch(path);
  if (!res.ok) return null;
  const html = await res.text();
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

// Fetch multiple paths in parallel batches with delay between batches
export async function tbFetchBatch<T>(
  paths: string[],
  parseFn: (data: Record<string, unknown> | null, index: number) => T | null
): Promise<(T | null)[]> {
  const results: (T | null)[] = new Array(paths.length).fill(null);

  for (let i = 0; i < paths.length; i += BATCH_SIZE) {
    const batch = paths.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(
      batch.map(async (path, batchIdx) => {
        const globalIdx = i + batchIdx;
        try {
          const data = await tbFetchNextData(path);
          return parseFn(data, globalIdx);
        } catch {
          return null;
        }
      })
    );

    batchResults.forEach((result, batchIdx) => {
      results[i + batchIdx] =
        result.status === "fulfilled" ? result.value : null;
    });

    // Delay between batches
    if (i + BATCH_SIZE < paths.length) {
      await sleep(BATCH_DELAY_MS + Math.random() * 300);
    }
  }

  return results;
}
