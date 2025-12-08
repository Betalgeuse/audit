'use client';

import { useState } from 'react';
import { Market } from '@/types';

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
  const [currentPage, setCurrentPage] = useState(targetPage);
  const [zoom, setZoom] = useState(100);

  const totalPages = market === 'US' ? 120 : 95;
  const documentTitle = market === 'US' 
    ? 'AMAT 10-K FY2024' 
    : 'SK하이닉스 사업보고서 2024';

  return (
    <div className="pdf-viewer">
      {/* Toolbar - BamSEC Style */}
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
          {/* Page Navigation */}
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
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="pdf-toolbar-btn px-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="h-5 w-px bg-white/20" />

          {/* Zoom Controls */}
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

      {/* PDF Content */}
      <div className="pdf-content">
        <div
          className="pdf-page"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Mock PDF Page */}
          <div className="w-[612px] h-[792px] p-12 bg-white relative">
            {/* Header */}
            <div className="text-center border-b pb-4 mb-6">
              <h2 className="text-lg font-bold">
                {market === 'US' 
                  ? 'APPLIED MATERIALS, INC.' 
                  : 'SK하이닉스 주식회사'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {market === 'US'
                  ? 'CONSOLIDATED STATEMENTS OF OPERATIONS'
                  : '연결포괄손익계산서'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {market === 'US' 
                  ? '(In millions, except per share amounts)' 
                  : '(단위: 백만원)'}
              </p>
            </div>

            {/* Mock Table Content */}
            {market === 'US' ? (
              <div className="text-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-2"></th>
                      <th className="text-right py-2">FY2017</th>
                      <th className="text-right py-2">FY2016</th>
                      <th className="text-right py-2">FY2015</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Net revenue</td>
                      <td className={`text-right py-2 ${highlightText === '14,537' ? 'highlight-cell' : ''}`}>
                        $14,537
                      </td>
                      <td className={`text-right py-2 ${highlightText === '10,825' ? 'highlight-cell' : ''}`}>
                        $10,825
                      </td>
                      <td className="text-right py-2">$9,659</td>
                    </tr>
                    <tr>
                      <td className="py-2">Cost of products sold</td>
                      <td className="text-right py-2">8,020</td>
                      <td className="text-right py-2">6,202</td>
                      <td className="text-right py-2">6,706</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Gross profit</td>
                      <td className={`text-right py-2 font-medium ${highlightText === '6,517' ? 'highlight-cell' : ''}`}>
                        6,517
                      </td>
                      <td className="text-right py-2 font-medium">4,623</td>
                      <td className="text-right py-2 font-medium">2,953</td>
                    </tr>
                    <tr>
                      <td className="py-2">Operating expenses</td>
                      <td className="text-right py-2">2,154</td>
                      <td className="text-right py-2">1,923</td>
                      <td className="text-right py-2">1,876</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">Operating income</td>
                      <td className={`text-right py-2 font-medium ${highlightText === '4,363' ? 'highlight-cell' : ''}`}>
                        4,363
                      </td>
                      <td className="text-right py-2 font-medium">2,700</td>
                      <td className="text-right py-2 font-medium">1,077</td>
                    </tr>
                    <tr className="border-t-2 border-double">
                      <td className="py-2 font-bold">Net income</td>
                      <td className={`text-right py-2 font-bold ${highlightText === '3,434' ? 'highlight-cell' : ''}`}>
                        $3,434
                      </td>
                      <td className="text-right py-2 font-bold">$1,721</td>
                      <td className="text-right py-2 font-bold">$1,377</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-6">
                  See accompanying notes to consolidated financial statements.
                </p>
              </div>
            ) : (
              <div className="text-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-2">과목</th>
                      <th className="text-center py-2 w-16">주석</th>
                      <th className="text-right py-2">제5기</th>
                      <th className="text-right py-2">제4기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">I. 매출액</td>
                      <td className="text-center py-2 text-blue-600">(주5,6)</td>
                      <td className={`text-right py-2 ${highlightText === '44,621,568' ? 'highlight-cell' : ''}`}>
                        44,621,568
                      </td>
                      <td className={`text-right py-2 ${highlightText === '42,997,792' ? 'highlight-cell' : ''}`}>
                        42,997,792
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">II. 매출원가</td>
                      <td className="text-center py-2 text-blue-600">(주28,33)</td>
                      <td className="text-right py-2">28,993,713</td>
                      <td className="text-right py-2">24,045,600</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">III. 매출총이익</td>
                      <td className="text-center py-2"></td>
                      <td className="text-right py-2 font-medium">15,627,855</td>
                      <td className="text-right py-2 font-medium">18,952,192</td>
                    </tr>
                    <tr>
                      <td className="py-2">IV. 판매비와관리비</td>
                      <td className="text-center py-2 text-blue-600">(주29,30)</td>
                      <td className="text-right py-2">4,532,187</td>
                      <td className="text-right py-2">4,123,456</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 font-medium">V. 영업이익</td>
                      <td className="text-center py-2"></td>
                      <td className="text-right py-2 font-medium">11,095,668</td>
                      <td className={`text-right py-2 font-medium ${highlightText === '14,828,736' ? 'highlight-cell' : ''}`}>
                        14,828,736
                      </td>
                    </tr>
                    <tr className="border-t-2 border-double">
                      <td className="py-2 font-bold">VI. 당기순이익</td>
                      <td className="text-center py-2"></td>
                      <td className="text-right py-2 font-bold">8,234,567</td>
                      <td className={`text-right py-2 font-bold ${highlightText === '12,345,678' ? 'highlight-cell' : ''}`}>
                        12,345,678
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-6">
                  주석은 연결재무제표의 일부입니다.
                </p>
              </div>
            )}

            {/* Page Number */}
            <div className="absolute bottom-8 right-12 text-sm text-gray-400">
              {currentPage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
