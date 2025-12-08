'use client';

import { useState } from 'react';
import { Market, DocumentSection } from '@/types';
import documentSections from '@/data/document-sections.json';

interface NavigationSidebarProps {
  market: Market;
  currentSection: string;
  currentPage: number;
}

export function NavigationSidebar({
  market,
  currentSection,
  currentPage,
}: NavigationSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'financials',
    'notes',
  ]);

  const sections = market === 'US' 
    ? documentSections.US.sections 
    : documentSections.KR.sections;
  const title = market === 'US' 
    ? documentSections.US.title 
    : documentSections.KR.title;

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderSection = (section: DocumentSection, depth: number = 0) => {
    const hasChildren = section.children && section.children.length > 0;
    const isExpanded = expandedSections.includes(section.id);
    const isActive = section.id === currentSection;
    const isNearPage = Math.abs(section.page - currentPage) < 5;

    return (
      <div key={section.id}>
        <div
          className={`nav-section ${isActive ? 'active' : ''} ${
            isNearPage && !isActive ? 'bg-burgundy-light' : ''
          }`}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
          onClick={() => hasChildren && toggleSection(section.id)}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {hasChildren && (
                <svg 
                  width="10" 
                  height="10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
              <span className={hasChildren ? 'font-medium' : ''}>
                {section.title}
              </span>
            </span>
            <span className="text-2xs font-mono text-text-muted">p.{section.page}</span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="nav-section-children">
            {section.children!.map((child) =>
              renderSection(child as DocumentSection, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="nav-sidebar">
      {/* Header */}
      <div className="nav-sidebar-header">
        <h3>{title}</h3>
        <p>{market === 'US' ? 'Table of Contents' : '목차'}</p>
      </div>
      
      {/* Sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {sections.map((section) => renderSection(section as DocumentSection))}
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-surface-secondary">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">
            {market === 'US' ? 'Current Page' : '현재 페이지'}
          </span>
          <span className="font-mono font-medium text-primary">{currentPage}</span>
        </div>
      </div>
    </div>
  );
}
