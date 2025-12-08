'use client';

import { Market } from '@/types';

interface MarketTabsProps {
  market: Market;
  onMarketChange: (market: Market) => void;
}

export function MarketTabs({ market, onMarketChange }: MarketTabsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onMarketChange('US')}
        className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-150 ${
          market === 'US'
            ? 'bg-primary text-white shadow-sm'
            : 'bg-surface text-text-secondary hover:bg-primary-light hover:text-primary border border-border'
        }`}
      >
        <span className="flex items-center gap-2">
          <span>🇺🇸</span>
          <span>US Market</span>
          <span className="text-xs opacity-70">(AMAT)</span>
        </span>
      </button>
      <button
        onClick={() => onMarketChange('KR')}
        className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-150 ${
          market === 'KR'
            ? 'bg-primary text-white shadow-sm'
            : 'bg-surface text-text-secondary hover:bg-primary-light hover:text-primary border border-border'
        }`}
      >
        <span className="flex items-center gap-2">
          <span>🇰🇷</span>
          <span>한국 시장</span>
          <span className="text-xs opacity-70">(SK하이닉스)</span>
        </span>
      </button>
    </div>
  );
}
