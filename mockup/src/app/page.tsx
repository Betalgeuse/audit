'use client';

import { useState } from 'react';
import { Market, ViewerState, FootnotePopupState, AIMessage, Footnote, SourceDocument, DocumentType, SourceReference } from '@/types';
import { UploadLanding } from '@/components/LandingPage/UploadLanding';
import { DocumentViewer } from '@/components/DocumentViewer/DocumentViewer';
import { FootnotePopup } from '@/components/FootnoteSystem/FootnotePopup';

import footnotesAmat from '@/data/footnotes-amat.json';
import footnotesSkhynix from '@/data/footnotes-skhynix.json';

const SAMPLE_DOCUMENTS: SourceDocument[] = [
  {
    id: 'amat-10k',
    name: 'Applied Materials 10-K (FY2024)',
    type: 'pdf',
    path: '/pdfs/amat_10k.pdf',
    market: 'US',
    size: '691 KB',
  },
  {
    id: 'skhynix-report',
    name: 'SK하이닉스 사업보고서 (2024)',
    type: 'pdf',
    path: '/pdfs/sk_hynix_10k.pdf',
    market: 'KR',
    size: '2.0 MB',
  },
];

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'viewer'>('landing');
  const [documents, setDocuments] = useState<SourceDocument[]>(SAMPLE_DOCUMENTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<SourceDocument | null>(null);
  
  const [market, setMarket] = useState<Market>('US');
  const [viewerState, setViewerState] = useState<ViewerState>({
    isOpen: false,
    market: 'US',
    selectedCell: null,
    targetPage: 1,
    targetSection: '',
    highlightText: '',
  });
  const [footnotePopup, setFootnotePopup] = useState<FootnotePopupState>({
    isVisible: false,
    footnote: null,
    position: { x: 0, y: 0 },
    isPinned: false,
  });
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);

  const footnotes = market === 'US' ? footnotesAmat.footnotes : footnotesSkhynix.footnotes;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === documents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(documents.map((d) => d.id));
    }
  };

  const handleDocumentClick = (doc: SourceDocument) => {
    setSelectedDocument(doc);
    setMarket(doc.market);
    setViewerState({
      isOpen: true,
      market: doc.market,
      selectedCell: null,
      targetPage: 1,
      targetSection: '',
      highlightText: '',
    });
    setCurrentView('viewer');
  };

  const getDocumentType = (filename: string): DocumentType => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'pdf';
      case 'xbrl':
      case 'xml':
        return 'xbrl';
      case 'xlsx':
      case 'xls':
        return 'excel';
      case 'docx':
      case 'doc':
        return 'word';
      case 'hwp':
        return 'hwp';
      default:
        return 'pdf';
    }
  };

  const handleFileUpload = (files: FileList) => {
    const newDocs: SourceDocument[] = Array.from(files).map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      type: getDocumentType(file.name),
      path: URL.createObjectURL(file),
      market: 'US' as Market,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      uploadedAt: new Date(),
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
  };

  const handleCloseViewer = () => {
    setViewerState((prev) => ({ ...prev, isOpen: false }));
    setCurrentView('landing');
    setSelectedDocument(null);
  };

  const handleFootnoteHover = (footnote: Footnote, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setFootnotePopup({
      isVisible: true,
      footnote,
      position: {
        x: rect.left,
        y: rect.bottom + 8,
      },
      isPinned: false,
    });
  };

  const handleFootnoteLeave = () => {
    if (!footnotePopup.isPinned) {
      setFootnotePopup((prev) => ({ ...prev, isVisible: false }));
    }
  };

  const handleViewInDocument = (footnote: Footnote) => {
    if (footnote.targetPage) {
      setViewerState({
        isOpen: true,
        market,
        selectedCell: null,
        targetPage: footnote.targetPage,
        targetSection: footnote.id,
        highlightText: footnote.title,
      });
      setFootnotePopup((prev) => ({ ...prev, isVisible: false, isPinned: false }));
    }
  };

  const handleSourceClick = (ref: SourceReference) => {
    setViewerState((prev) => ({
      ...prev,
      targetPage: ref.page,
      targetSection: ref.section || '',
      highlightText: ref.label,
    }));
  };

  if (currentView === 'landing') {
    return (
      <main className="min-h-screen bg-surface-secondary">
        <header className="bamsec-header">
          <div className="header-main">
            <div className="header-logo">
              <div className="flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.15" />
                  <path d="M6 8h12M6 12h12M6 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h1>
                  <span className="text-white">Audit</span>
                  <span className="text-white/60 font-normal ml-1">Document Analyzer</span>
                </h1>
              </div>
            </div>
            <div className="header-search">
              <div className="search-wrapper">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Search documents, companies, or filings..." />
              </div>
            </div>
            <div className="header-actions">
              <button>Help Center</button>
            </div>
          </div>
        </header>

        <UploadLanding
          documents={documents}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onDocumentClick={handleDocumentClick}
          onFileUpload={handleFileUpload}
          aiMessages={aiMessages}
          setAiMessages={setAiMessages}
        />

        {footnotePopup.isVisible && footnotePopup.footnote && (
          <FootnotePopup
            footnote={footnotePopup.footnote}
            position={footnotePopup.position}
            isPinned={footnotePopup.isPinned}
            onClose={() => setFootnotePopup((prev) => ({ ...prev, isVisible: false, isPinned: false }))}
            onPin={() => setFootnotePopup((prev) => ({ ...prev, isPinned: true }))}
            onViewInDocument={handleViewInDocument}
            market={market}
          />
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-secondary">
      <DocumentViewer
        viewerState={viewerState}
        market={market}
        onClose={handleCloseViewer}
        aiMessages={aiMessages}
        setAiMessages={setAiMessages}
        onSourceClick={handleSourceClick}
      />

      {footnotePopup.isVisible && footnotePopup.footnote && (
        <FootnotePopup
          footnote={footnotePopup.footnote}
          position={footnotePopup.position}
          isPinned={footnotePopup.isPinned}
          onClose={() => setFootnotePopup((prev) => ({ ...prev, isVisible: false, isPinned: false }))}
          onPin={() => setFootnotePopup((prev) => ({ ...prev, isPinned: true }))}
          onViewInDocument={handleViewInDocument}
          market={market}
        />
      )}
    </main>
  );
}
