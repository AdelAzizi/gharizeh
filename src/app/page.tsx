'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { loadGharyzehData } from '../lib/data-loader';
import { transformRawDataToUIData } from '../lib/data-transformer';
import type { CharacterUIData } from '../types/gharyzeh';
import { CharacterCard } from '@/components/CharacterCard';

export default function Home() {
  const [characters, setCharacters] = useState<CharacterUIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await loadGharyzehData();
        const transformedData = transformRawDataToUIData(rawData);
        setCharacters(transformedData);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while loading data.');
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // In a future step, this could trigger a navigation or a modal.
    // For now, it just updates the state.
    // Example of future navigation: router.push(`/dashboard/${id.toLowerCase()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jungle-night">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <h1 className="text-4xl font-bold text-misty-white tracking-widest">Gharizeh</h1>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-jungle-night text-misty-white p-8 text-center">
        <div className="text-5xl mb-4">🧭</div>
        <h2 className="text-2xl font-bold mb-2">یک مسیر غیرمنتظره در جنگل.</h2>
        <p className="text-stone-gray mb-6 max-w-md">
          به نظر می‌رسد در حال حاضر امکان بارگذاری نقشه استراتژی‌ها وجود ندارد. لطفاً از اتصال اینترنت خود اطمینان حاصل کرده و دوباره تلاش کنید.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-deep-slate border border-faint-line rounded-full text-misty-white hover:bg-misty-white hover:text-jungle-night transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-jungle-night text-misty-white px-8 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-foreground">Gharizeh</h1>
          <p className="text-sm font-regular text-muted-foreground tracking-wider">SELECT A CHARACTER</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char) => (
            <CharacterCard
              key={char.strategyName}
              data={char}
              isSelected={selectedId === char.strategyName}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
