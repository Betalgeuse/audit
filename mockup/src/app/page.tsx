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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Factset Audit POC
              </h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Mock-up
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Interactive Financial Document Viewer
            </div>
          </div>
        </div>
      </header>

      {/* Market Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <MarketTabs market={market} onMarketChange={setMarket} />
      </div>

      {/* Company Info */}
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {financials.company}
              </h2>
              <p className="text-gray-500">
                {financials.ticker} | {financials.currency} ({financials.unit})
              </p>
            </div>
            {financials.stockPrice && (
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {market === 'US' ? '$' : '₩'}
                  {financials.stockPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Current Price</div>
              </div>
            )}
          </div>

          {/* Financial Table */}
          <FinancialTable
            data={financials}
            market={market}
            onCellClick={handleCellClick}
            onFootnoteHover={handleFootnoteHover}
            onFootnoteLeave={handleFootnoteLeave}
            findFootnote={findFootnote}
          />

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
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
