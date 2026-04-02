"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ZipCodeForm } from "@/components/ZipCodeForm";
import { StoreSelector } from "@/components/StoreSelector";
import { useStores } from "@/hooks/useStores";

export default function Home() {
  const router = useRouter();
  const [zip, setZip] = useState<string | null>(null);
  const { stores, error, isLoading } = useStores(zip);

  return (
    <main className="flex-1 flex flex-col justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg">
        <div className="text-center mb-3">
          <Image
            src="/logo-v2.png"
            alt="TacoHacker"
            width={500}
            height={500}
            style={{ width: 440, height: "auto" }}
            className="mx-auto mb-0"
            priority
          />
        </div>

        <div className="space-y-5">
          <ZipCodeForm onSubmit={setZip} isLoading={isLoading} />

          {error && (
            <div className="rounded-xl border border-red-200/60 bg-red-50/50 p-3 text-center">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {stores && stores.length > 0 && (
            <StoreSelector
              stores={stores}
              onSelect={(store) => router.push(`/store/${store.id}`)}
            />
          )}
        </div>

      </div>
    </main>
  );
}
