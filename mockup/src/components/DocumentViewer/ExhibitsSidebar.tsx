'use client';

import { Market } from '@/types';

interface ExhibitsSidebarProps {
  market: Market;
  companyName: string;
  filingType: string;
  filingDate: string;
}

interface Exhibit {
  id: string;
  type: string;
  description: string;
  active?: boolean;
}

const US_EXHIBITS: Exhibit[] = [
  { id: '10-K', type: '10-K', description: 'Annual Report', active: true },
  { id: 'EX-19.1', type: 'EX-19.1', description: 'Report furnished to security holders' },
  { id: 'EX-21', type: 'EX-21', description: 'Subsidiaries of the registrant' },
  { id: 'EX-23', type: 'EX-23', description: 'Consent of expert or counsel' },
  { id: 'EX-31.1', type: 'EX-31.1', description: 'Management certification' },
  { id: 'EX-31.2', type: 'EX-31.2', description: 'Management certification' },
  { id: 'EX-32.1', type: 'EX-32.1', description: 'Financial report certification' },
  { id: 'EX-32.2', type: 'EX-32.2', description: 'Financial report certification' },
];

const KR_EXHIBITS: Exhibit[] = [
  { id: 'annual', type: '사업보고서', description: '2023.12.31 기준', active: true },
  { id: 'audit', type: '감사보고서', description: '연결재무제표' },
  { id: 'quarter', type: '분기보고서', description: '2024.03.31 기준' },
  { id: 'semi', type: '반기보고서', description: '2024.06.30 기준' },
  { id: 'disclosure', type: '주요사항보고서', description: '자기주식취득결정' },
  { id: 'governance', type: '지배구조보고서', description: '2023년' },
];

const GRAPHICS_US = [
  { name: 'amat-2024_g1.jpg', type: 'GRAPHIC' },
  { name: 'amat-2024_g2.jpg', type: 'GRAPHIC' },
  { name: 'stock-chart.png', type: 'GRAPHIC' },
];

const GRAPHICS_KR = [
  { name: 'skhynix-logo.png', type: 'GRAPHIC' },
  { name: 'financial-chart.png', type: 'GRAPHIC' },
  { name: 'org-structure.png', type: 'GRAPHIC' },
];

export function ExhibitsSidebar({
  market,
  companyName,
  filingType,
  filingDate,
}: ExhibitsSidebarProps) {
  const exhibits = market === 'US' ? US_EXHIBITS : KR_EXHIBITS;
  const graphics = market === 'US' ? GRAPHICS_US : GRAPHICS_KR;
  const isUS = market === 'US';

  return (
    <div className="exhibits-sidebar">
      {/* Logo and Company Info */}
      <div className="exhibits-header">
        <div className="exhibits-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#8B1538" />
            <path d="M6 8h12M6 12h12M6 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="logo-text">
            <span className="logo-name">Audit</span>
            <span className="logo-subtitle">by FactSet</span>
          </div>
        </div>
        <div className="company-info">
          <a href="#" className="company-link">
            <span className="company-icon">◆</span>
            {companyName}
          </a>
          <div className="filing-info">
            <span className="filing-label">{isUS ? 'Filing:' : '보고서:'}</span>
            <span className="filing-value">{filingType}</span>
          </div>
          <div className="filing-info">
            <span className="filing-label">{isUS ? 'Filed On:' : '제출일:'}</span>
            <span className="filing-value">{filingDate}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="exhibits-actions">
        <button className="action-btn" title={isUS ? 'Share' : '공유'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>{isUS ? 'Share' : '공유'}</span>
        </button>
        <button className="action-btn" title={isUS ? 'Print' : '인쇄'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>{isUS ? 'Print' : '인쇄'}</span>
        </button>
        <button className="action-btn" title="PDF">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <span>PDF</span>
        </button>
        <button className="action-btn" title={isUS ? 'Download Tables' : '표 다운로드'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{isUS ? 'Download' : '다운로드'}</span>
        </button>
        <button className="action-btn" title={isUS ? 'Compare' : '비교'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>{isUS ? 'Compare' : '비교'}</span>
        </button>
      </div>

      {/* Exhibits List */}
      <div className="exhibits-section">
        <h6 className="section-title">{isUS ? 'Exhibits' : '첨부서류'}</h6>
        <div className="exhibits-list">
          {exhibits.map((exhibit) => (
            <a
              key={exhibit.id}
              href="#"
              className={`exhibit-item ${exhibit.active ? 'active' : ''}`}
            >
              <span className="exhibit-type">{exhibit.type}</span>
              <span className="exhibit-desc">{exhibit.description}</span>
              <span className="exhibit-arrow">›</span>
            </a>
          ))}
        </div>
      </div>

      {/* Graphics & Data Files */}
      <div className="exhibits-section">
        <h6 className="section-title">{isUS ? 'Graphics & Data Files' : '그래픽 및 데이터'}</h6>
        <div className="graphics-list">
          {graphics.map((graphic, index) => (
            <a key={index} href="#" className="graphic-item">
              <span className="graphic-type">{graphic.type}</span>
              <span className="graphic-name">{graphic.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* External Links */}
      <div className="exhibits-section">
        <h6 className="section-title">{isUS ? 'External Links' : '외부 링크'}</h6>
        <ul className="external-links">
          {isUS ? (
            <>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  SEC Structured Data <span className="external-icon">↗</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  SEC EDGAR <span className="external-icon">↗</span>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  DART 전자공시 <span className="external-icon">↗</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  KIND 기업공시채널 <span className="external-icon">↗</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Feedback */}
      <div className="feedback-section">
        <button className="feedback-btn">
          {isUS ? 'See an issue? Let us know.' : '문제가 있나요? 알려주세요.'}
        </button>
      </div>
    </div>
  );
}
