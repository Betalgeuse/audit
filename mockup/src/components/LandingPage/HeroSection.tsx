'use client';

import { Market } from '@/types';

interface HeroSectionProps {
  market: Market;
  company: string;
  ticker: string;
  stockPrice?: number;
}

export function HeroSection({ market, company, ticker, stockPrice }: HeroSectionProps) {
  const priceChange = market === 'US' ? 2.34 : -1.25;
  const priceChangePercent = market === 'US' ? 0.88 : -0.70;
  const isPositive = priceChange > 0;

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
                {market === 'US' ? 'Financial Document Viewer' : '재무문서 뷰어'}
              </span>
              <span className="px-3 py-1 bg-green-500/20 backdrop-blur rounded-full text-sm text-green-200">
                {market === 'US' ? 'Live' : '실시간'}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {market === 'US' 
                ? 'Interactive Financial Analysis' 
                : '대화형 재무 분석'}
            </h1>
            
            <p className="text-lg text-blue-100 mb-8 max-w-lg">
              {market === 'US'
                ? 'Navigate financial documents with AI-powered insights, instant footnote lookups, and intelligent Q&A.'
                : 'AI 기반 인사이트, 즉각적인 주석 조회, 지능형 Q&A로 재무 문서를 탐색하세요.'}
            </p>

            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition shadow-lg">
                {market === 'US' ? 'Try For Free' : '무료 체험'}
              </button>
              <button className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 transition">
                {market === 'US' ? 'Watch Demo' : '데모 보기'}
              </button>
            </div>
          </div>

          {/* Right Content - Stock Card Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 transform lg:translate-x-8">
            {/* Stock Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-gray-700 text-sm">
                      {ticker.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{company}</h3>
                    <p className="text-sm text-gray-500">{ticker}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {market === 'US' ? '$' : '₩'}{stockPrice?.toLocaleString()}
                </div>
                <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-32 bg-gray-50 rounded-lg mb-6 flex items-end justify-around px-4 py-2">
              {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90].map((h, i) => (
                <div
                  key={i}
                  className={`w-4 rounded-t transition-all ${
                    i === 11 ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">
                  {market === 'US' ? 'Revenue' : '매출액'}
                </div>
                <div className="font-bold text-gray-900">
                  {market === 'US' ? '$23.06B' : '₩44.6T'}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">
                  {market === 'US' ? 'Net Income' : '순이익'}
                </div>
                <div className="font-bold text-gray-900">
                  {market === 'US' ? '$5.89B' : '₩8.23T'}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">
                  {market === 'US' ? 'Market Cap' : '시가총액'}
                </div>
                <div className="font-bold text-gray-900">
                  {market === 'US' ? '$168.4B' : '₩129.8T'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
