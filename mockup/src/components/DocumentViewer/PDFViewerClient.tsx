'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Market } from '@/types';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.2.16.105.js';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(targetPage);
  const [zoom, setZoom] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  const pdfPath = market === 'US' 
    ? '/pdfs/amat_10k.pdf'
    : '/pdfs/sk_hynix_10k.pdf';

  const documentTitle = market === 'US' 
    ? 'AMAT 10-K FY2024' 
    : 'SK하이닉스 사업보고서 2024';

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err: any) {
        console.error('PDF load error:', err);
        console.error('Error details:', err?.message, err?.name, err?.details);
        setError(`PDF 로드 실패: ${err?.message || 'Unknown error'}`);
        setLoading(false);
      }
    };
    loadPdf();
  }, [pdfPath]);

  useEffect(() => {
    if (targetPage > 0 && targetPage <= numPages) {
      setCurrentPage(targetPage);
    }
  }, [targetPage, numPages]);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: zoom });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Render text layer
      if (textLayerRef.current) {
        textLayerRef.current.innerHTML = '';
        textLayerRef.current.style.width = `${viewport.width}px`;
        textLayerRef.current.style.height = `${viewport.height}px`;
        textLayerRef.current.style.setProperty('--scale-factor', String(zoom));

        const textContent = await page.getTextContent();
        
        pdfjsLib.renderTextLayer({
          textContent,
          container: textLayerRef.current,
          viewport,
          textDivs: [],
        });

        // Apply highlighting after text layer is rendered
        setTimeout(() => {
          if (highlightText && textLayerRef.current) {
            const spans = textLayerRef.current.querySelectorAll('span');
            const searchText = highlightText.replace(/,/g, '').toLowerCase();
            
            spans.forEach((span) => {
              const text = (span.textContent || '').replace(/,/g, '').toLowerCase();
              if (text.includes(searchText) || searchText.includes(text)) {
                span.classList.add('highlight-text');
                span.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            });
          }
        }, 100);
      }
    } catch (err) {
      console.error('Page render error:', err);
    }
  }, [pdfDoc, currentPage, zoom, highlightText]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  const goToPrevPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(Math.min(numPages, currentPage + 1));
  const zoomIn = () => setZoom(Math.min(3, zoom + 0.2));
  const zoomOut = () => setZoom(Math.max(0.5, zoom - 0.2));

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="pdf-toolbar-btn flex items-center gap-2">
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
            <button onClick={goToPrevPage} disabled={currentPage <= 1} className="pdf-toolbar-btn px-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-mono min-w-[80px] text-center">
              {currentPage} / {numPages || '...'}
            </span>
            <button onClick={goToNextPage} disabled={currentPage >= numPages} className="pdf-toolbar-btn px-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <button onClick={zoomOut} className="pdf-toolbar-btn px-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </button>
            <span className="text-sm font-mono w-14 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} className="pdf-toolbar-btn px-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pdf-content" ref={containerRef}>
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="loading-spinner" />
            <span className="ml-2">Loading PDF...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="pdf-page-wrapper">
            <canvas ref={canvasRef} className="pdf-canvas" />
            <div ref={textLayerRef} className="textLayer" />
          </div>
        )}
      </div>

      <style jsx global>{`
        .pdf-page-wrapper {
          position: relative;
          display: inline-block;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          background: white;
        }
        
        .pdf-canvas {
          display: block;
        }
        
        .textLayer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 0.2;
          line-height: 1.0;
        }
        
        .textLayer > span {
          color: transparent;
          position: absolute;
          white-space: pre;
          cursor: text;
          transform-origin: 0% 0%;
        }
        
        .textLayer ::selection {
          background: rgba(0, 0, 255, 0.3);
        }
        
        .highlight-text {
          background-color: rgba(255, 235, 59, 0.7) !important;
          border-radius: 2px;
          animation: highlightPulse 2s ease-in-out infinite;
        }
        
        @keyframes highlightPulse {
          0%, 100% { background-color: rgba(255, 235, 59, 0.7); }
          50% { background-color: rgba(255, 193, 7, 0.9); }
        }
      `}</style>
    </div>
  );
}
