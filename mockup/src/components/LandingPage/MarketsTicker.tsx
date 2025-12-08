'use client';

import { Market } from '@/types';

interface MarketsTickerProps {
  market: Market;
}

interface MarketData {
  name: string;
  shortName: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  delayed?: boolean;
}

const US_MARKETS: MarketData[] = [
  { name: 'eMini S&P 500 (CME)', shortName: 'ES', price: '6,888.75', change: '+10.50', changePercent: '+0.16%', isPositive: true, delayed: true },
  { name: 'eMini NASDAQ 100', shortName: 'NQ', price: '25,792.00', change: '+60.25', changePercent: '+0.23%', isPositive: true, delayed: true },
  { name: 'FTSE 100 (IFEU)', shortName: 'Z', price: '9,682.50', change: '-4.00', changePercent: '-0.04%', isPositive: false, delayed: true },
  { name: 'EURO STOXX 50', shortName: 'FESX', price: '5,724.78', change: '+0.85', changePercent: '+0.02%', isPositive: true, delayed: true },
  { name: 'Germany DAX (TR)', shortName: 'DAX', price: '24,067.24', change: '+39.10', changePercent: '+0.16%', isPositive: true, delayed: true },
  { name: 'Crude Oil WTI', shortName: 'CL', price: '59.55', change: '-0.53', changePercent: '-0.88%', isPositive: false, delayed: true },
  { name: 'EUR/USD', shortName: 'EURUSD', price: '1.1654', change: '+0.0012', changePercent: '+0.10%', isPositive: true },
  { name: 'US 10Y T-Note', shortName: 'ZN', price: '4.14%', change: '+0.01', changePercent: '+0.24%', isPositive: true },
];

const KR_MARKETS: MarketData[] = [
  { name: 'KOSPI', shortName: 'KOSPI', price: '2,891.35', change: '+18.42', changePercent: '+0.64%', isPositive: true },
  { name: 'KOSDAQ', shortName: 'KOSDAQ', price: '856.78', change: '+5.23', changePercent: '+0.61%', isPositive: true },
  { name: 'USD/KRW', shortName: 'USDKRW', price: '1,312.50', change: '-2.30', changePercent: '-0.18%', isPositive: false },
  { name: 'Nikkei 225', shortName: 'NKY', price: '50,670.00', change: '+80.00', changePercent: '+0.16%', isPositive: true, delayed: true },
  { name: 'Hang Seng', shortName: 'HSI', price: '25,808.00', change: '-339.00', changePercent: '-1.30%', isPositive: false, delayed: true },
  { name: 'Shanghai Comp', shortName: 'SHCOMP', price: '3,245.68', change: '+17.52', changePercent: '+0.54%', isPositive: true, delayed: true },
  { name: 'Korea 3Y Bond', shortName: 'KTB3Y', price: '2.85%', change: '-0.02', changePercent: '-0.70%', isPositive: false },
  { name: 'WTI 원유', shortName: 'CL', price: '59.55', change: '-0.53', changePercent: '-0.88%', isPositive: false, delayed: true },
];

type MarketRegion = 'Overview' | 'Americas' | 'Europe' | 'Asia Pacific' | 'Bonds' | 'Fx';
type KRMarketRegion = '전체' | '국내' | '아시아' | '미국' | '유럽' | '원자재';

export function MarketsTicker({ market }: MarketsTickerProps) {
  const markets = market === 'US' ? US_MARKETS : KR_MARKETS;
  const regions: (MarketRegion | KRMarketRegion)[] = market === 'US' 
    ? ['Overview', 'Americas', 'Europe', 'Asia Pacific', 'Bonds', 'Fx']
    : ['전체', '국내', '아시아', '미국', '유럽', '원자재'];

  return (
    <div className="markets-ticker">
      <div className="markets-ticker-header">
        <div className="markets-ticker-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>{market === 'US' ? 'Markets' : '시장현황'}</span>
        </div>
        <div className="markets-regions">
          {regions.map((region, index) => (
            <button
              key={region}
              className={`region-btn ${index === 0 ? 'active' : ''}`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
      <div className="markets-ticker-content">
        {markets.map((item, index) => (
          <div key={index} className="market-item">
            <div className="market-name">
              <span className="name-full">{item.name}</span>
              {item.delayed && <span className="delayed-badge">D</span>}
            </div>
            <div className="market-data">
              <span className="market-price">{item.price}</span>
              <span className={`market-change ${item.isPositive ? 'positive' : 'negative'}`}>
                {item.change} ({item.changePercent})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
