'use client';

import { Footnote, Market } from '@/types';

interface FootnotePopupProps {
  footnote: Footnote;
  position: { x: number; y: number };
  isPinned: boolean;
  onClose: () => void;
  onPin: () => void;
  onViewInDocument: (footnote: Footnote) => void;
  market: Market;
}

export function FootnotePopup({
  footnote,
  position,
  isPinned,
  onClose,
  onPin,
  onViewInDocument,
  market,
}: FootnotePopupProps) {
  const adjustedX = Math.min(position.x, window.innerWidth - 420);
  const adjustedY = Math.min(position.y, window.innerHeight - 300);

  return (
    <>
      {isPinned && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}
      <div
        className="footnote-popup z-50"
        style={{
          left: adjustedX,
          top: adjustedY,
        }}
        onMouseEnter={onPin}
      >
        <div className="flex items-start justify-between">
          <div className="footnote-popup-title">
            {footnote.title}
          </div>
          {isPinned && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="footnote-popup-content">
          {footnote.preview}
        </div>

        <div className="footnote-popup-actions">
          {footnote.targetPage && (
            <button
              className="footnote-popup-btn footnote-popup-btn-primary"
              onClick={() => onViewInDocument(footnote)}
            >
              {market === 'KR' ? '문서에서 보기' : 'View in Document'}
              <span className="ml-1 opacity-75">→ p.{footnote.targetPage}</span>
            </button>
          )}
          <button
            className="footnote-popup-btn footnote-popup-btn-secondary"
            onClick={onPin}
          >
            {market === 'KR' ? '고정' : 'Pin'}
          </button>
        </div>

        {isPinned && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-xs text-gray-500 mb-2">
              {market === 'KR' ? '전체 내용:' : 'Full Content:'}
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
              {footnote.fullContent}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
