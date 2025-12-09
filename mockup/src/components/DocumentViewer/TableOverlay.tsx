'use client';

import { useState, useRef, useEffect } from 'react';
import { Market, ExportFormat } from '@/types';

interface TableInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
}

interface TableOverlayProps {
  table: TableInfo;
  scale: number;
  market: Market;
  onExport: (format: ExportFormat, tableId: string) => void;
  onSimilarTables: (tableId: string) => void;
  onLink: (tableId: string) => void;
}

export function TableOverlay({
  table,
  scale,
  market,
  onExport,
  onSimilarTables,
  onLink,
}: TableOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format: ExportFormat) => {
    onExport(format, table.id);
    setShowExportMenu(false);
    setIsExpanded(false);
  };

  const scaledX = table.x * scale;
  const scaledY = table.y * scale;

  return (
    <div
      className="table-overlay"
      style={{
        left: `${scaledX}px`,
        top: `${scaledY}px`,
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!showExportMenu) {
          setIsExpanded(false);
        }
      }}
      ref={menuRef}
    >
      <div className={`table-overlay-buttons ${isExpanded ? 'expanded' : ''}`}>
        {!isExpanded ? (
          <button className="table-overlay-trigger" title={table.title}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        ) : (
          <>
            <button
              className="table-overlay-btn"
              onClick={() => onLink(table.id)}
              title={market === 'US' ? 'Copy Link' : '링크 복사'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>

            <button
              className="table-overlay-btn"
              onClick={() => onSimilarTables(table.id)}
              title={market === 'US' ? 'Similar Tables' : '유사 테이블'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>

            <div className="table-overlay-export-wrapper">
              <button
                className="table-overlay-btn table-overlay-btn-primary"
                onClick={() => setShowExportMenu(!showExportMenu)}
                title={market === 'US' ? 'Export' : '내보내기'}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>

              {showExportMenu && (
                <div className="table-overlay-export-menu">
                  <button onClick={() => handleExport('excel')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Excel
                  </button>
                  <button onClick={() => handleExport('csv')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    CSV
                  </button>
                  <button onClick={() => handleExport('image')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    PNG
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
