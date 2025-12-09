'use client';

import { SourceDocument, AIMessage, Market } from '@/types';
import { SourcesSidebar } from './SourcesSidebar';
import { UploadArea } from './UploadArea';
import { AISidebar } from '@/components/AIAssistant/AISidebar';

interface UploadLandingProps {
  documents: SourceDocument[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDocumentClick: (doc: SourceDocument) => void;
  onFileUpload: (files: FileList) => void;
  aiMessages: AIMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
}

export function UploadLanding({
  documents,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDocumentClick,
  onFileUpload,
  aiMessages,
  setAiMessages,
}: UploadLandingProps) {
  const handleAddSource = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.xbrl,.xlsx,.xls,.docx,.doc,.hwp';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        onFileUpload(files);
      }
    };
    input.click();
  };

  return (
    <div className="upload-landing">
      <SourcesSidebar
        documents={documents}
        selectedIds={selectedIds}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDocumentClick={onDocumentClick}
        onAddSource={handleAddSource}
      />

      <UploadArea
        onFileUpload={onFileUpload}
        sourceCount={documents.length}
      />

      <AISidebar
        market={'US' as Market}
        messages={aiMessages}
        setMessages={setAiMessages}
        currentContext={{
          page: 0,
          section: '',
          highlight: '',
        }}
      />
    </div>
  );
}
