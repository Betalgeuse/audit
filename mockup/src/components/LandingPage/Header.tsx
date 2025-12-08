'use client';

import { useState } from 'react';
import { Market } from '@/types';

interface HeaderProps {
  market: Market;
  onMarketChange: (market: Market) => void;
}

export function Header({ market, onMarketChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar - Similar to FactSet */}
      <div className="bg-gray-900 text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-6 flex justify-end items-center gap-4">
          <a href="#" className="hover:text-blue-300 transition">Support</a>
          <a href="#" className="hover:text-blue-300 transition">Developer Portal</a>
          <a href="#" className="hover:text-blue-300 transition">Login</a>
          <button 
            onClick={() => onMarketChange(market === 'US' ? 'KR' : 'US')}
            className="flex items-center gap-1 hover:text-blue-300"
          >
            {market === 'US' ? '🇺🇸 EN' : '🇰🇷 KO'}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">FA</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                {market === 'US' ? 'Factset Audit' : '팩트셋 감사'}
              </span>
            </a>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <NavItem label={market === 'US' ? 'Documents' : '문서'} />
              <NavItem label={market === 'US' ? 'Analysis' : '분석'} />
              <NavItem label={market === 'US' ? 'Reports' : '보고서'} />
              <NavItem label={market === 'US' ? 'Insights' : '인사이트'} />
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={market === 'US' ? 'Search companies...' : '회사명 검색...'}
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Market Switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onMarketChange('US')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  market === 'US'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                US
              </button>
              <button
                onClick={() => onMarketChange('KR')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  market === 'KR'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                KR
              </button>
            </div>

            {/* CTA Button - FactSet Style */}
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              {market === 'US' ? 'Try For Free' : '무료 체험'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <button className="text-gray-700 hover:text-blue-600 font-medium text-sm transition flex items-center gap-1">
      {label}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
