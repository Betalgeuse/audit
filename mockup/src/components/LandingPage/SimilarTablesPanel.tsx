'use client';

import { useState } from 'react';
import { SimilarTable, Market } from '@/types';

interface SimilarTablesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
  similarTables: SimilarTable[];
}

export function SimilarTablesPanel({
  isOpen,
  onClose,
  market,
  similarTables,
}: SimilarTablesPanelProps) {
  const [selectedTable, setSelectedTable] = useState<SimilarTable | null>(null);

  if (!isOpen) return null;

  const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') return value;
    return value.toLocaleString();
  };

  return (
    <div className="similar-tables-panel">
      <div className="similar-tables-header">
        <h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Similar Tables
        </h3>
        <button className="close-btn" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="similar-tables-content">
        <p className="similar-tables-desc">
          {market === 'US' 
            ? 'Select a financial filing to compare similar tables across different periods.'
            : '다른 기간의 유사한 테이블을 비교하려면 재무 보고서를 선택하세요.'}
        </p>

        <div className="similar-tables-list">
          {similarTables.map((table) => (
            <div
              key={table.id}
              className={`similar-table-item ${selectedTable?.id === table.id ? 'selected' : ''}`}
              onClick={() => setSelectedTable(table)}
            >
              <div className="similar-table-info">
                <span className="filing-badge">{table.filingType}</span>
                <span className="period-label">{table.period}</span>
              </div>
              <div className="similar-table-dates">
                <span>ended {table.endDate}</span>
                <span>{table.filedDate}</span>
              </div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>

        {selectedTable && (
          <div className="similar-table-preview">
            <div className="preview-header">
              <h4>{selectedTable.filingType} - {selectedTable.period}</h4>
              <span className="preview-date">Filed: {selectedTable.filedDate}</span>
            </div>
            <div className="preview-table-wrapper">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>{market === 'US' ? 'Item' : '항목'}</th>
                    <th>{market === 'US' ? 'Value' : '금액'}</th>
                    <th>{market === 'US' ? 'Change' : '변동'}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTable.data.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.item}</td>
                      <td className="text-right font-mono">{formatNumber(row.values[0])}</td>
                      <td className={`text-right font-mono ${Number(row.values[1]) >= 0 ? 'positive' : 'negative'}`}>
                        {Number(row.values[1]) >= 0 ? '+' : ''}{row.values[1]}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="preview-actions">
              <button className="preview-btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Full Table
              </button>
              <button className="preview-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
                Compare Side by Side
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
