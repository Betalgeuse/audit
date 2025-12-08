'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Market, ExportFormat } from '@/types';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/web/pdf_viewer.css';
import { TableOverlay } from './TableOverlay';
import pdfTablesData from '@/data/pdf-tables.json';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.2.16.105.js';

interface TableInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
}

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
  const [pageInput, setPageInput] = useState(String(targetPage));
  const [zoom, setZoom] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentTables, setCurrentTables] = useState<TableInfo[]>([]);

  const pdfKey = market === 'US' ? 'amat_10k' : 'sk_hynix_10k';
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

  useEffect(() => {
    const pageKey = `page_${currentPage}`;
    const pdfData = (pdfTablesData as Record<string, Record<string, TableInfo[]>>)[pdfKey];
    const tables = pdfData?.[pageKey] || [];
    setCurrentTables(tables);
  }, [currentPage, pdfKey]);

  const renderTaskRef = useRef<any>(null);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    // Cancel any ongoing render
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    try {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: zoom });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Clear canvas before rendering
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask = page.render({
        canvasContext: context,
        viewport: viewport,
      });
      
      renderTaskRef.current = renderTask;
      await renderTask.promise;
      renderTaskRef.current = null;

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
    } catch (err: any) {
      // Ignore cancelled render errors
      if (err?.name === 'RenderingCancelledException') return;
      console.error('Page render error:', err);
    }
  }, [pdfDoc, currentPage, zoom, highlightText]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  const goToPrevPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    setPageInput(String(newPage));
  };
  const goToNextPage = () => {
    const newPage = Math.min(numPages, currentPage + 1);
    setCurrentPage(newPage);
    setPageInput(String(newPage));
  };
  const zoomIn = () => setZoom(Math.min(3, zoom + 0.2));
  const zoomOut = () => setZoom(Math.max(0.5, zoom - 0.2));

  const handleTableExport = (format: ExportFormat, tableId: string) => {
    const table = currentTables.find(t => t.id === tableId);
    console.log(`Exporting table "${table?.title}" as ${format}`);
    // TODO: Implement actual export logic
  };

  const handleSimilarTables = (tableId: string) => {
    const table = currentTables.find(t => t.id === tableId);
    console.log(`Finding similar tables for "${table?.title}"`);
    // TODO: Open SimilarTablesPanel
  };

  const handleTableLink = (tableId: string) => {
    const table = currentTables.find(t => t.id === tableId);
    const link = `${window.location.origin}?doc=${pdfKey}&page=${currentPage}&table=${tableId}`;
    navigator.clipboard.writeText(link);
    console.log(`Copied link for table "${table?.title}"`);
    // TODO: Show toast notification
  };

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
            <div className="flex items-center text-sm font-mono">
              <input
                type="text"
                inputMode="numeric"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={() => {
                  const page = parseInt(pageInput, 10);
                  if (!isNaN(page) && page >= 1 && page <= numPages) {
                    setCurrentPage(page);
                    setPageInput(String(page));
                  } else {
                    setPageInput(String(currentPage));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt(pageInput, 10);
                    if (!isNaN(page) && page >= 1 && page <= numPages) {
                      setCurrentPage(page);
                      setPageInput(String(page));
                    } else {
                      setPageInput(String(currentPage));
                    }
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-12 text-center bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white outline-none focus:border-white/40"
              />
              <span className="mx-1">/</span>
              <span>{numPages || '...'}</span>
            </div>
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
            {currentTables.map((table) => (
              <TableOverlay
                key={table.id}
                table={table}
                scale={zoom}
                market={market}
                onExport={handleTableExport}
                onSimilarTables={handleSimilarTables}
                onLink={handleTableLink}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .pdf-viewer {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #525659;
          height: 100%;
          min-height: 0;
        }
        
        .pdf-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: auto;
          padding: 24px;
          min-height: 0;
        }
        
        .pdf-page-wrapper {
          position: relative;
          display: inline-block;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          background: white;
          margin-bottom: 24px;
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
          background-color: #FF0000 !important;
          opacity: 1 !important;
          border-radius: 2px;
          animation: highlightPulse 2s ease-in-out infinite;
        }
        
        @keyframes highlightPulse {
          0%, 100% { background-color: #FF0000; }
          50% { background-color: #CC0000; }
        }
      `}</style>
    </div>
  );
}
