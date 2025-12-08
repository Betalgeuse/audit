'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Market } from '@/types';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerClientProps {
  market: Market;
  targetPage: number;
  highlightText: string;
  onClose: () => void;
}

export function PDFViewerClient({
  market,
  targetPage,
  highlightText,
  onClose,
}: PDFViewerClientProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(targetPage);
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  const pdfPath = market === 'US' 
    ? '/pdfs/amat_10k.pdf'
    : '/pdfs/sk_hynix_10k.pdf';

  const documentTitle = market === 'US' 
    ? 'AMAT 10-K FY2017' 
    : 'SK하이닉스 감사보고서 제75기';

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('PDF를 불러오는데 실패했습니다.');
  };

  useEffect(() => {
    setCurrentPage(targetPage);
  }, [targetPage]);

  const highlightSearchText = useCallback(() => {
    if (!highlightText) return;

    const textLayer = containerRef.current?.querySelector('.react-pdf__Page__textContent');
    if (!textLayer) return;

    const spans = textLayer.querySelectorAll('span');
    const searchText = highlightText.replace(/,/g, '');
    
    spans.forEach((span) => {
      span.classList.remove('highlight-text');
      const text = span.textContent?.replace(/,/g, '') || '';
      if (text.includes(searchText) || searchText.includes(text)) {
        span.classList.add('highlight-text');
        span.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }, [highlightText]);

  const onPageLoadSuccess = () => {
    setTimeout(highlightSearchText, 300);
  };

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
          <div className="h-5 w-px bg-white/20" />
          <span className="text-sm font-medium">{documentTitle}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="pdf-toolbar-btn px-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-mono min-w-[80px] text-center">
              {currentPage} / {numPages || '...'}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
              disabled={currentPage >= numPages}
              className="pdf-toolbar-btn px-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="pdf-toolbar-btn px-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </button>
            <span className="text-sm font-mono w-14 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="pdf-toolbar-btn px-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pdf-content" ref={containerRef}>
        {error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        ) : (
          <Document
            file={pdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="loading-spinner" />
                <span className="ml-2">Loading PDF...</span>
              </div>
            }
          >
            <div ref={textLayerRef}>
              <Page
                pageNumber={currentPage}
                scale={zoom / 100}
                onLoadSuccess={onPageLoadSuccess}
                loading={
                  <div className="flex items-center justify-center py-20">
                    <div className="loading-spinner" />
                  </div>
                }
              />
            </div>
          </Document>
        )}
      </div>

      <style jsx global>{`
        .highlight-text {
          background-color: rgba(255, 235, 59, 0.6) !important;
          border-radius: 2px;
          padding: 2px 0;
          animation: highlightPulse 2s ease-in-out;
        }
        
        @keyframes highlightPulse {
          0%, 100% { background-color: rgba(255, 235, 59, 0.6); }
          50% { background-color: rgba(255, 193, 7, 0.8); }
        }
        
        .react-pdf__Page__textContent {
          pointer-events: auto;
        }
        
        .react-pdf__Page__textContent span {
          cursor: text;
        }
      `}</style>
    </div>
  );
}
