'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Market } from '@/types';

const PDFViewerClient = dynamic(
  () => import('./PDFViewerClient').then((mod) => mod.PDFViewerClient),
  { 
    ssr: false,
    loading: () => (
      <div className="pdf-viewer">
        <div className="pdf-toolbar">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>
        <div className="pdf-content flex items-center justify-center">
          <div className="loading-spinner" />
          <span className="ml-2">Loading PDF viewer...</span>
        </div>
      </div>
    )
  }
);

interface PDFViewerProps {
  market: Market;
  targetPage: number;
  highlightText: string;
  onClose: () => void;
}

export function PDFViewer({
  market,
  targetPage,
  highlightText,
  onClose,
}: PDFViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="pdf-viewer">
        <div className="pdf-toolbar">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="pdf-toolbar-btn flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {market === 'US' ? 'Back' : '뒤로'}
            </button>
          </div>
        </div>
        <div className="pdf-content flex items-center justify-center">
          <div className="loading-spinner" />
          <span className="ml-2">Loading PDF viewer...</span>
        </div>
      </div>
    );
  }

  return (
    <PDFViewerClient
      market={market}
      targetPage={targetPage}
      highlightText={highlightText}
      onClose={onClose}
    />
  );
}
