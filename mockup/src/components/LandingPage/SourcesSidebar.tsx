'use client';

import { SourceDocument, DocumentType } from '@/types';

interface SourcesSidebarProps {
  documents: SourceDocument[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDocumentClick: (doc: SourceDocument) => void;
  onAddSource: () => void;
}

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case 'pdf':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
          <text x="7" y="17" fontSize="6" fill="currentColor" fontWeight="bold">PDF</text>
        </svg>
      );
    case 'xbrl':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
          <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'excel':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12l3 4m0-4l-3 4M14 12v4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'word':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
          <path d="M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'hwp':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sky-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
          <text x="6" y="17" fontSize="6" fill="currentColor" fontWeight="bold">한</text>
        </svg>
      );
  }
};

export function SourcesSidebar({
  documents,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDocumentClick,
  onAddSource,
}: SourcesSidebarProps) {
  const allSelected = documents.length > 0 && selectedIds.length === documents.length;

  return (
    <div className="sources-sidebar">
      <div className="sources-header">
        <h2>Sources</h2>
        <button className="sources-collapse-btn" title="Collapse">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </div>

      <button className="add-sources-btn" onClick={onAddSource}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add sources
      </button>

      <div className="sources-list">
        {documents.length > 0 && (
          <label className="select-all-row">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onSelectAll}
            />
            <span>Select all sources</span>
          </label>
        )}

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="source-item"
            onClick={() => onDocumentClick(doc)}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(doc.id)}
              onChange={(e) => {
                e.stopPropagation();
                onToggleSelect(doc.id);
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="source-icon">{getDocumentIcon(doc.type)}</span>
            <span className="source-name" title={doc.name}>
              {doc.name}
            </span>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="sources-empty">
            <p>No sources added yet</p>
            <p className="text-xs opacity-60">Click "Add sources" to upload documents</p>
          </div>
        )}
      </div>
    </div>
  );
}
