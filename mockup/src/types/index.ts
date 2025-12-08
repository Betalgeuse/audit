export type Market = 'US' | 'KR';

export interface FinancialData {
  company: string;
  ticker: string;
  market: Market | string;
  currency: string;
  unit: string;
  stockPrice?: number;
  incomeStatement: IncomeStatementRow[];
  documentMapping: Record<string, DocumentMapping>;
}

export interface IncomeStatementRow {
  item: string;
  주석?: string;
  [key: string]: string | number | undefined;
}

export interface DocumentMapping {
  page: number;
  section: string;
  highlight: string;
}

export interface Footnote {
  id: string;
  marker: string;
  triggerPatterns: string[];
  title: string;
  preview: string;
  fullContent: string;
  targetPage: number | null;
}

export interface AIResponse {
  triggers: string[];
  context: string;
  response: string;
}

export interface AIResponseData {
  responses: AIResponse[];
  defaultResponse: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  page: number;
  children?: DocumentSection[];
}

export interface ViewerState {
  isOpen: boolean;
  market: Market;
  selectedCell: string | null;
  targetPage: number;
  targetSection: string;
  highlightText: string;
}

export interface FootnotePopupState {
  isVisible: boolean;
  footnote: Footnote | null;
  position: { x: number; y: number };
  isPinned: boolean;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type DocumentType = 'pdf' | 'xbrl' | 'excel' | 'word' | 'hwp';

export interface SourceReference {
  page: number;
  section?: string;
  label: string;
}

export interface SourceDocument {
  id: string;
  name: string;
  type: DocumentType;
  path: string;
  market: Market;
  size?: string;
  uploadedAt?: Date;
}

export type ExportFormat = 'excel' | 'csv' | 'image' | 'pdf';

export interface SimilarTable {
  id: string;
  filingType: string;
  period: string;
  endDate: string;
  filedDate: string;
  data: {
    item: string;
    values: (number | string)[];
  }[];
}
