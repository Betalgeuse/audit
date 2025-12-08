'use client';

import { useRef, useState, DragEvent } from 'react';

interface UploadAreaProps {
  onFileUpload: (files: FileList) => void;
  sourceCount: number;
  maxSources?: number;
}

export function UploadArea({ onFileUpload, sourceCount, maxSources = 300 }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div className="upload-area-container">
      <div className="upload-area-content">
        <div className="upload-hero">
          <div className="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6M9 15l3-3 3 3" />
            </svg>
          </div>
          <h2>Upload your documents to begin analysis</h2>
          <p className="upload-subtitle">
            AI-powered document analysis for financial statements, legal documents, and regulatory filings
          </p>
        </div>

        <div className="supported-formats">
          <h3>Supported Formats</h3>
          <div className="format-grid">
            <div className="format-category">
              <div className="format-icon financial">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="format-info">
                <span className="format-title">Financial / Data</span>
                <span className="format-types">PDF, XBRL, Excel, Parquet, JSON</span>
              </div>
            </div>
            <div className="format-category">
              <div className="format-icon legal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <div className="format-info">
                <span className="format-title">Documents</span>
                <span className="format-types">Word (.docx), HWP, TXT, Markdown</span>
              </div>
            </div>
            <div className="format-category">
              <div className="format-icon regulatory">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div className="format-info">
                <span className="format-title">Images / Media</span>
                <span className="format-types">PNG, JPG, TIFF, CSV</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-zone-content">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="drop-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag & drop your files here</p>
            <span className="drop-formats">PDF, XBRL, Parquet, JSON, Docs, IMG supported</span>
            <span className="drop-or">or</span>
            <button className="upload-btn" onClick={handleFileSelect}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload files
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.xbrl,.xlsx,.xls,.docx,.doc,.hwp,.json,.parquet,.png,.jpg,.jpeg,.tiff,.csv,.txt,.md"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="upload-footer">
        <div className="source-counter">
          <span>{sourceCount}</span> / <span>{maxSources}</span>
        </div>
      </div>
    </div>
  );
}
