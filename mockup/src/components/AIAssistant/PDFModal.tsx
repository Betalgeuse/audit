'use client';

import { useEffect, useCallback } from 'react';
import { Market } from '@/types';
import { PDFViewer } from '@/components/DocumentViewer/PDFViewer';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
  targetPage: number;
  highlightText: string;
}

export function PDFModal({
  isOpen,
  onClose,
  market,
  targetPage,
  highlightText,
}: PDFModalProps) {
  const handleEscKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <div className="pdf-modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>
              {market === 'US' ? 'Document Reference' : '문서 참조'}
            </span>
            <span className="pdf-modal-page-badge">
              {market === 'US' ? 'Page' : '페이지'} {targetPage}
            </span>
          </div>
          <button className="pdf-modal-close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="pdf-modal-content">
          <PDFViewer
            market={market}
            targetPage={targetPage}
            highlightText={highlightText}
            onClose={onClose}
          />
        </div>
        <div className="pdf-modal-footer">
          <span className="pdf-modal-highlight-label">
            {market === 'US' ? 'Highlighted:' : '하이라이트:'}
          </span>
          <span className="pdf-modal-highlight-text">&quot;{highlightText}&quot;</span>
        </div>
      </div>
    </div>
  );
}
