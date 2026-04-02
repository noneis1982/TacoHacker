interface GeoResult {
  lat: number;
  lng: number;
}

export async function geocodeZip(zip: string): Promise<GeoResult> {
  // Use zippopotam.us — free, no API key needed
  const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    throw new Error("Could not find location for that zip code");
  }

  const data = await res.json();
  const place = data?.places?.[0];
  if (!place) {
    throw new Error("Could not find location for that zip code");
  }

  return {
    lat: parseFloat(place.latitude),
    lng: parseFloat(place.longitude),
  };
}
