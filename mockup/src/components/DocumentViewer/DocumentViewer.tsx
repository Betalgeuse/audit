'use client';

import { ViewerState, Market, AIMessage } from '@/types';
import { NavigationSidebar } from './NavigationSidebar';
import { PDFViewer } from './PDFViewer';
import { AISidebar } from '@/components/AIAssistant/AISidebar';

interface DocumentViewerProps {
  viewerState: ViewerState;
  market: Market;
  onClose: () => void;
  aiMessages: AIMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
}

export function DocumentViewer({
  viewerState,
  market,
  onClose,
  aiMessages,
  setAiMessages,
}: DocumentViewerProps) {
  return (
    <div className="viewer-modal">
      <div className="viewer-container">
        {/* Navigation Sidebar */}
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
        />
      </div>
    </div>
  );
}
