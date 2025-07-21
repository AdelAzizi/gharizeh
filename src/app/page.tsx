// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { loadGharyzehData } from '../lib/data-loader';
import { transformRawDataToUIData } from '../lib/data-transformer';
import type { CharacterUIData } from '../types/gharyzeh';

export default function Home() {
  const [characters, setCharacters] = useState<CharacterUIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("شروع فرایند خواندن و تبدیل داده‌ها...");
        const rawData = await loadGharyzehData();
        const transformedData = transformRawDataToUIData(rawData);
        console.log("✅ داده با موفقیت تبدیل شد:", transformedData);
        setCharacters(transformedData);
      } catch (err: any) {
        console.error("❌ خطا در فرایند دریافت یا تبدیل داده:", err);
        setError(err.message || "خطای ناشناخته در بارگذاری داده‌ها.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>در حال بارگذاری اطلاعات گالری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive-foreground">
        <p>خطا: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">اطلاعات غریزه بارگذاری شد!</h1>
      <p className="mb-8">کنسول مرورگر را برای دیدن جزئیات داده‌ها بررسی کنید.</p>
      <pre className="bg-card p-4 rounded-lg overflow-auto max-h-[70vh]">
        {JSON.stringify(characters, null, 2)}
      </pre>
    </div>
  );
}
