// Serves /ads.txt for Google AdSense. AdSense requires this file to authorize
// Google to sell the site's ad inventory. Dormant (404) until the publisher ID
// is configured via NEXT_PUBLIC_ADSENSE_CLIENT.
//
// ads.txt uses the publisher ID WITHOUT the "ca-" prefix (e.g. "pub-123...").

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response("Not found", { status: 404 });
  }

  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
}
