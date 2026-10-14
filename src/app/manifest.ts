import type { MetadataRoute } from "next";

// Web app manifest — controls the icon and name used when the site is added
// to an iOS/Android home screen as a shortcut.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TacoHacker - Cheapest Menu Hack Finder",
    short_name: "TacoHacker",
    description:
      "Find the cheapest way to build your perfect Taco Bell order using menu hacks and modifications.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1025",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
