'use client';

import { useState } from 'react';
import { Market, ViewerState, FootnotePopupState, AIMessage, Footnote } from '@/types';
import { MarketTabs } from '@/components/LandingPage/MarketTabs';
import { FinancialTable } from '@/components/LandingPage/FinancialTable';
import { DocumentViewer } from '@/components/DocumentViewer/DocumentViewer';
import { FootnotePopup } from '@/components/FootnoteSystem/FootnotePopup';

import amatFinancials from '@/data/amat-financials.json';
import skhynixFinancials from '@/data/skhynix-financials.json';
import footnotesAmat from '@/data/footnotes-amat.json';
import footnotesSkhynix from '@/data/footnotes-skhynix.json';

export default function Home() {
  const [market, setMarket] = useState<Market>('US');
  const [viewerState, setViewerState] = useState<ViewerState>({
    isOpen: false,
    market: 'US',
    selectedCell: null,
    targetPage: 1,
    targetSection: '',
    highlightText: '',
  });
  const [footnotePopup, setFootnotePopup] = useState<FootnotePopupState>({
    isVisible: false,
    footnote: null,
    position: { x: 0, y: 0 },
    isPinned: false,
  });
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);

  const financials = market === 'US' ? amatFinancials : skhynixFinancials;
  const footnotes = market === 'US' ? footnotesAmat.footnotes : footnotesSkhynix.footnotes;

  const handleCellClick = (item: string, period: string, value: number | string) => {
    const key = `${item}|${period}`;
    const docMapping = financials.documentMapping as Record<string, { page: number; section: string; highlight: string }>;
    const mapping = docMapping[key];
    
    if (mapping) {
      setViewerState({
        isOpen: true,
        market,
        selectedCell: key,
        targetPage: mapping.page,
        targetSection: mapping.section,
        highlightText: mapping.highlight,
      });
    } else {
      setViewerState({
        isOpen: true,
        market,
        selectedCell: key,
        targetPage: market === 'US' ? 45 : 12,
        targetSection: market === 'US' ? 'income-statement' : 'consolidated-income',
        highlightText: String(value),
      });
    }
  };

  const handleFootnoteHover = (
    footnote: Footnote,
    event: React.MouseEvent
  ) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setFootnotePopup({
      isVisible: true,
      footnote,
      position: {
        x: rect.left,
        y: rect.bottom + 8,
      },
      isPinned: false,
    });
  };

  const handleFootnoteLeave = () => {
    if (!footnotePopup.isPinned) {
      setFootnotePopup(prev => ({ ...prev, isVisible: false }));
    }
  };

  const handleFootnoteClick = (footnote: Footnote) => {
    setFootnotePopup(prev => ({
      ...prev,
      isPinned: !prev.isPinned,
    }));
  };

  const handleViewInDocument = (footnote: Footnote) => {
    if (footnote.targetPage) {
      setViewerState({
        isOpen: true,
        market,
        selectedCell: null,
        targetPage: footnote.targetPage,
        targetSection: footnote.id,
        highlightText: footnote.title,
      });
      setFootnotePopup(prev => ({ ...prev, isVisible: false, isPinned: false }));
    }
  };

  const handleCloseViewer = () => {
    setViewerState(prev => ({ ...prev, isOpen: false }));
  };

  const findFootnote = (text: string): Footnote | null => {
    for (const fn of footnotes) {
      for (const pattern of fn.triggerPatterns) {
        if (text.includes(pattern)) {
          return fn as Footnote;
        }
      }
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-surface-secondary">
      {/* Header - BamSEC Style */}
      <header className="bamsec-header">
        <div className="header-main">
          <div className="header-logo">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.15" />
                <path d="M6 8h12M6 12h12M6 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h1>
                <span className="text-white">Audit</span>
                <span className="text-white/60 font-normal ml-1">POC</span>
              </h1>
            </div>
          </div>
          <div className="header-search">
            <div className="search-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search companies, filings, or documents..." />
            </div>
          </div>
          <div className="header-actions">
            <button>Help Center</button>
          </div>
        </div>
      </header>

      {/* Market Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <MarketTabs market={market} onMarketChange={setMarket} />
      </div>

      {/* Company Bar - BamSEC Style */}
      <div className="company-bar">
        <div className="company-bar-left">
          <h2 className="company-bar-name">{financials.company}</h2>
          <span className="company-bar-ticker">
            {financials.ticker} · {financials.currency} ({financials.unit})
          </span>
          {financials.stockPrice && (
            <div className="company-bar-price">
              <span className="price-value">
                {market === 'US' ? '$' : '₩'}{financials.stockPrice.toLocaleString()}
              </span>
              <span className="price-change positive">+2.34%</span>
            </div>
          )}
        </div>
        <div className="company-bar-right">
          <button className="watch-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Watch
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-surface rounded-lg shadow-card border border-border p-6">
          {/* Financial Table */}
          <FinancialTable
            data={financials}
            market={market}
            onCellClick={handleCellClick}
            onFootnoteHover={handleFootnoteHover}
            onFootnoteLeave={handleFootnoteLeave}
            findFootnote={findFootnote}
          />

          {/* Instructions - BamSEC Style */}
          <div className="mt-6 p-4 bg-bamsec-burgundy-light rounded-lg border border-bamsec-burgundy/20">
            <h4 className="font-medium text-bamsec-burgundy mb-2">How to use:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• <strong>Click any number</strong> to open the document viewer at that location</li>
              <li>• <strong>Hover over {market === 'KR' ? '주석 markers like (주5,6)' : 'footnote markers'}</strong> to see footnote preview</li>
              <li>• <strong>Use the AI assistant</strong> in the document viewer to ask questions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewerState.isOpen && (
        <DocumentViewer
          viewerState={viewerState}
          market={market}
          onClose={handleCloseViewer}
          aiMessages={aiMessages}
          setAiMessages={setAiMessages}
        />
      )}

      {/* Footnote Popup */}
      {footnotePopup.isVisible && footnotePopup.footnote && (
        <FootnotePopup
          footnote={footnotePopup.footnote}
          position={footnotePopup.position}
          isPinned={footnotePopup.isPinned}
          onClose={() => setFootnotePopup(prev => ({ ...prev, isVisible: false, isPinned: false }))}
          onPin={() => setFootnotePopup(prev => ({ ...prev, isPinned: true }))}
          onViewInDocument={handleViewInDocument}
          market={market}
        />
      )}
    </main>
  );
}
