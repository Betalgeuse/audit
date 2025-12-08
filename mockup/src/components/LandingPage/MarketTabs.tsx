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
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          market === 'US'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🇺🇸</span>
          <span>US Market</span>
          <span className="text-xs opacity-75">(AMAT)</span>
        </span>
      </button>
      <button
        onClick={() => onMarketChange('KR')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          market === 'KR'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🇰🇷</span>
          <span>한국 시장</span>
          <span className="text-xs opacity-75">(SK하이닉스)</span>
        </span>
      </button>
    </div>
  );
}
