'use client';

import { useState } from 'react';
import { ViewerState, Market, AIMessage, SourceReference, SelectedTextContext } from '@/types';
import { NavigationSidebar } from './NavigationSidebar';
import { PDFViewer } from './PDFViewer';
import { ExhibitsSidebar } from './ExhibitsSidebar';
import { AISidebar } from '@/components/AIAssistant/AISidebar';

interface DocumentViewerProps {
  viewerState: ViewerState;
  market: Market;
  onClose: () => void;
  aiMessages: AIMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  onSourceClick?: (ref: SourceReference) => void;
}

const COMPANY_INFO = {
  US: {
    name: 'Applied Materials Inc.',
    filingType: '10-K',
    filingDate: '12/13/24 4:01 PM EST',
  },
  KR: {
    name: 'SK하이닉스 주식회사',
    filingType: '사업보고서',
    filingDate: '2024.03.21 16:30 KST',
  },
};

export function DocumentViewer({
  viewerState,
  market,
  onClose,
  aiMessages,
  setAiMessages,
  onSourceClick,
}: DocumentViewerProps) {
  const companyInfo = COMPANY_INFO[market];
  const [selectedTextContext, setSelectedTextContext] = useState<SelectedTextContext | null>(null);

  const handleDiscussWithAI = (text: string, page: number) => {
    setSelectedTextContext({ text, page });
  };

  const handleClearSelectedText = () => {
    setSelectedTextContext(null);
  };

  return (
    <div className="viewer-modal">
      <div className="viewer-container bamsec-layout">
        {/* Navigation Sidebar (TOC) */}
        <NavigationSidebar
          market={market}
          currentSection={viewerState.targetSection}
          currentPage={viewerState.targetPage}
        />

        {/* PDF Viewer */}
        <PDFViewer
          market={market}
          targetPage={viewerState.targetPage}
          highlightText={viewerState.highlightText}
          onClose={onClose}
          onDiscussWithAI={handleDiscussWithAI}
        />

        {/* Exhibits Sidebar (BamSEC-style) */}
        <ExhibitsSidebar
          market={market}
          companyName={companyInfo.name}
          filingType={companyInfo.filingType}
          filingDate={companyInfo.filingDate}
        />

        {/* AI Sidebar */}
        <AISidebar
          market={market}
          messages={aiMessages}
          setMessages={setAiMessages}
          currentContext={{
            page: viewerState.targetPage,
            section: viewerState.targetSection,
            highlight: viewerState.highlightText,
          }}
          onSourceClick={onSourceClick}
          selectedTextContext={selectedTextContext}
          onClearSelectedText={handleClearSelectedText}
        />
      </div>
    </div>
  );
}
