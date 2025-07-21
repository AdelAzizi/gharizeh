'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CharacterUIData } from '@/types/gharyzeh';
import { Card, CardContent } from '@/components/ui/card';

interface CharacterCardProps {
  data: CharacterUIData;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const RadarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
    <path d="M4 6h.01" />
    <path d="M2.29 9.62A10 10 0 0 0 3.34 19" />
    <path d="M8 21.71A10 10 0 0 0 19 20.66" />
    <path d="M22 16h-.01" />
    <path d="M16.66 4.93A10 10 0 0 0 4.93 19" />
  </svg>
);

export function CharacterCard({ data, isSelected, onClick }: CharacterCardProps) {
  const highlightColor = data.theme.highlight;

  return (
    <motion.div
      onClick={() => onClick(data.strategyName)}
      className={cn(
        'group relative w-full max-w-sm cursor-pointer transition-transform duration-300 ease-in-out',
        'hover:-translate-y-2'
      )}
      style={{
        '--highlight-color': highlightColor,
        '--glow-color': `${highlightColor}55`,
      } as React.CSSProperties}
    >
      <Card
        className={cn(
          'flex flex-col w-full aspect-[3/4] overflow-hidden rounded-2xl bg-deep-slate border-2 transition-all duration-300',
          'group-hover:shadow-[0_0_20px_3px_var(--glow-color)]',
          isSelected
            ? 'border-[var(--highlight-color)] shadow-[0_0_20px_3px_var(--glow-color)]'
            : 'border-transparent'
        )}
      >
        <div className="relative w-full h-3/5">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <CardContent className="relative flex flex-col justify-center items-center flex-grow p-6 text-center">
          <div>
            <h2
              className="text-3xl font-extrabold uppercase tracking-widest"
              style={{ color: highlightColor }}
            >
              {data.name}
            </h2>
            <p className="text-muted-foreground font-medium mt-1">{data.tagline}</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <RadarIcon className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}