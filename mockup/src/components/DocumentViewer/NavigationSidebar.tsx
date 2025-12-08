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
            isNearPage && !isActive ? 'bg-blue-50' : ''
          }`}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
          onClick={() => hasChildren && toggleSection(section.id)}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {hasChildren && (
                <span
                  className={`text-xs transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                >
                  ▶
                </span>
              )}
              <span className={hasChildren ? 'font-medium' : ''}>
                {section.title}
              </span>
            </span>
            <span className="text-xs text-gray-400">p.{section.page}</span>
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
      <div className="px-4 pb-4 border-b">
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {market === 'US' ? 'Table of Contents' : '목차'}
        </p>
      </div>
      <div className="py-2">
        {sections.map((section) => renderSection(section as DocumentSection))}
      </div>
      <div className="px-4 py-3 border-t bg-gray-50">
        <div className="text-xs text-gray-500">
          {market === 'US' ? 'Current Page:' : '현재 페이지:'}{' '}
          <span className="font-medium text-gray-900">{currentPage}</span>
        </div>
      </div>
    </div>
  );
}
