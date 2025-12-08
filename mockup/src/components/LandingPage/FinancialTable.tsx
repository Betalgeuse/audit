'use client';

import { Market, Footnote, FinancialData } from '@/types';

interface FinancialTableProps {
  data: FinancialData;
  market: Market;
  onCellClick: (item: string, period: string, value: number | string) => void;
  onFootnoteHover: (footnote: Footnote, event: React.MouseEvent) => void;
  onFootnoteLeave: () => void;
  findFootnote: (text: string) => Footnote | null;
}

export function FinancialTable({
  data,
  market,
  onCellClick,
  onFootnoteHover,
  onFootnoteLeave,
  findFootnote,
}: FinancialTableProps) {
  const periods = market === 'US' 
    ? ['FY15', 'FY16', 'FY17']
    : ['제74기', '제75기'];

  const formatNumber = (value: number | string | undefined): string => {
    if (value === undefined) return '-';
    if (typeof value === 'string') return value;
    return value.toLocaleString();
  };

  const renderFootnoteMarker = (text: string | undefined) => {
    if (!text) return null;
    
    const footnote = findFootnote(text);
    if (!footnote) {
      return (
        <span className="text-gray-500 text-sm ml-2">
          {text}
        </span>
      );
    }

    return (
      <span
        className="jushuk-marker ml-2"
        onMouseEnter={(e) => onFootnoteHover(footnote, e)}
        onMouseLeave={onFootnoteLeave}
      >
        {text}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="financial-table">
        <thead>
          <tr>
            <th className="w-48">{market === 'US' ? 'Item' : '항목'}</th>
            {market === 'KR' && <th className="w-24">주석</th>}
            {periods.map((period) => (
              <th key={period} className="w-28">{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.incomeStatement.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="font-medium">{row.item}</td>
              {market === 'KR' && (
                <td className="text-center">
                  {renderFootnoteMarker(row.주석)}
                </td>
              )}
              {periods.map((period) => {
                const value = row[period];
                const docMapping = data.documentMapping as Record<string, { page: number; section: string; highlight: string }>;
                const hasMapping = docMapping[`${row.item}|${period}`];
                
                return (
                  <td
                    key={period}
                    className={`clickable ${hasMapping ? 'font-medium text-blue-600' : ''}`}
                    onClick={() => onCellClick(row.item, period, value as number)}
                    title={hasMapping ? 'Click to view in document' : 'Click to search in document'}
                  >
                    {formatNumber(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
