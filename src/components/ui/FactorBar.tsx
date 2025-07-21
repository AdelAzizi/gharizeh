import * as React from 'react';
import { cn } from '@/lib/utils';

interface FactorBarProps {
  name: string;
  value: number;
  className?: string;
}

const FactorBar: React.FC<FactorBarProps> = ({ name, value, className }) => {
  const sanitizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full flex items-center gap-4', className)}>
      <span className="text-sm font-medium text-card-foreground min-w-[60px] text-right">{name}</span>
      <div className="flex-1 flex items-center gap-2">
        <div className="w-full bg-muted rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${sanitizedValue}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold text-muted-foreground w-12 text-right">{`${sanitizedValue}%`}</span>
      </div>
    </div>
  );
};

FactorBar.displayName = 'FactorBar';

export { FactorBar };