# PRD: Factset Audit POC - Full Functional Version

**Version:** 1.0  
**Date:** 2025-12-08  
**Delivery:** 2025-12-10 (2 days)  
**Type:** Production-Ready Prototype  
**Related Issues:** [QT-46](https://linear.app/betalgeuse/issue/QT-46), [QT-65](https://linear.app/betalgeuse/issue/QT-65), [QT-69](https://linear.app/betalgeuse/issue/QT-69)

---

## 1. Overview

### 1.1 Purpose
A **fully functional prototype** that delivers real document analysis, real-time footnote parsing, and AI-powered question answering using LLM + RAG architecture.

### 1.2 Key Principle
> **Everything that works in the mock-up must work identically with real backends.**

The full version replaces all mocked data and canned responses with live systems while maintaining the exact same UI/UX.

### 1.3 Timeline
- **Mock-up Delivered:** 2025-12-08
- **Full Functional Delivery:** 2025-12-10

---

## 2. Scope Comparison

| Feature | Mock-up | Full Functional |
|---------|---------|-----------------|
| Financial Data | Hardcoded JSON | Live API / Dynamic Extraction |
| PDF Viewer | Static embed | Dynamic with real navigation |
| Footnote Detection | Pre-defined patterns | Real-time PDF/Document parsing |
| Footnote Content | Pre-defined text | Extracted from actual document |
| AI Q&A | Canned responses | Real LLM + RAG backend |
| Document Support | AMAT + SK Hynix only | Any document (PDF, Word, Excel, etc.) |
| Korean 주석 | Fake AI responses | Real parsing + Real AI |

---

## 3. Supported Document Formats

### 3.1 File Types

| Format | Extension | Parser | Priority |
|--------|-----------|--------|----------|
| PDF | .pdf | pdf-parse, pdfjs-dist | P0 |
| Word | .docx | mammoth, docx | P0 |
| Text | .txt | Native | P0 |
| Excel | .xlsx, .xls | xlsx, exceljs | P0 |
| CSV | .csv | papaparse | P0 |
| Parquet | .parquet | parquetjs | P1 |
| XBRL | .xbrl, .xml | xbrl-parser (custom) | P1 |

### 3.2 Document Processing Pipeline

```
+------------------+     +------------------+     +------------------+
| Document Upload  | --> | Format Detection | --> | Parser Selection |
+------------------+     +------------------+     +------------------+
                                                          |
                                                          v
+------------------+     +------------------+     +------------------+
| Vector Store     | <-- | Chunk + Embed    | <-- | Content Extract  |
| (Embeddings)     |     | (Metadata)       |     | (Text + Tables)  |
+------------------+     +------------------+     +------------------+
```

### 3.3 Extraction Requirements

**PDF:**
- Text extraction with position data
- Table detection and structure preservation
- Footnote marker identification (¹, ², *, (주5), etc.)
- Section/heading detection for TOC
- Page number tracking

**Excel/CSV:**
- Sheet/tab preservation
- Cell reference mapping
- Formula detection (display results)
- Header row identification

**XBRL:**
- Taxonomy parsing
- Fact extraction with context
- Dimension handling
- Period/entity identification

---

## 4. Footnote System (Real-time)

### 4.1 Detection Patterns

```typescript
// Comprehensive footnote detection patterns
const footnotePatterns = {
  // Superscript numbers
  superscript: /[¹²³⁴⁵⁶⁷⁸⁹⁰]+/g,
  
  // Bracketed references
  bracketed: /\[(\d+)\]/g,
  parenthetical: /\((\d+)\)/g,
  
  // Note references
  noteRef: /(?:See\s+)?Note\s+(\d+)/gi,
  
  // Korean patterns (QT-69)
  korean: {
    jushuk: /\(주\s*(\d+(?:,\s*\d+)*)\)/g,     // (주5, 6)
    jushuks: /\(주석\s*(\d+(?:,\s*\d+)*)\)/g,  // (주석5)
    gakju: /각주\s*(\d+)/g,                     // 각주 1
    burok: /부록\s*([A-Z가-힣])/g,              // 부록 A
  },
  
  // Symbols
  symbols: /[*†‡§¶]/g,
  
  // Accounting standards
  standards: /(?:ASC|IFRS|K-IFRS|IAS)\s*\d+/gi,
};
```

### 4.2 Content Extraction Pipeline

```
+------------------+     +------------------+     +------------------+
| Detect Markers   | --> | Locate Content   | --> | Extract & Link   |
| in Body Text     |     | (Page Search)    |     | (Marker->Content)|
+------------------+     +------------------+     +------------------+
        |                        |                        |
        v                        v                        v
  "(주5, 6)" found         Search for             Return structured
  at page 12, row 3        "주석 5:" heading      { marker, content,
                           Found at page 45        preview, targetPage }
```

### 4.3 Footnote Data Structure

```typescript
interface ParsedFootnote {
  id: string;
  marker: string;                    // "(주5, 6)" or "[1]"
  markerType: 'korean' | 'numbered' | 'symbol' | 'standard';
  
  source: {
    page: number;
    position: { x: number; y: number };
    context: string;                 // Surrounding text
  };
  
  target: {
    page: number;
    section: string;
    heading: string;
  };
  
  content: {
    full: string;                    // Complete footnote text
    preview: string;                 // First 200 chars
    tables?: Table[];                // Any tables in footnote
    figures?: Figure[];              // Any figures referenced
  };
  
  relatedFootnotes?: string[];       // Cross-references within
}
```

---

## 5. AI Question-Answering System

### 5.1 Architecture Overview

```
+-----------------------------------------------------------------------+
|                         RAG Architecture                               |
+-----------------------------------------------------------------------+
|                                                                       |
|  +-------------+    +-------------+    +-------------+                |
|  | Document    |    | Chunking    |    | Embedding   |                |
|  | Ingestion   | -> | + Metadata  | -> | Generation  |                |
|  +-------------+    +-------------+    +-------------+                |
|                                              |                        |
|                                              v                        |
|  +-------------+    +-------------+    +-------------+                |
|  | User Query  | -> | Query       | -> | Vector      |                |
|  |             |    | Embedding   |    | Search      |                |
|  +-------------+    +-------------+    +-------------+                |
|                                              |                        |
|                                              v                        |
|  +-------------+    +-------------+    +-------------+                |
|  | Grounded    | <- | LLM         | <- | Context     |                |
|  | Response    |    | Generation  |    | Assembly    |                |
|  +-------------+    +-------------+    +-------------+                |
|                                                                       |
+-----------------------------------------------------------------------+
```

### 5.2 Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Vector DB | Pinecone / Chroma / Weaviate | Scalable similarity search |
| Embeddings | OpenAI text-embedding-3-small | High quality, cost-effective |
| LLM | GPT-4o / Claude 3.5 Sonnet | Best reasoning capabilities |
| Orchestration | LangChain / LlamaIndex | RAG pipeline management |

### 5.3 Document Chunking Strategy

```typescript
interface ChunkingConfig {
  // Base chunking
  chunkSize: 1000,           // tokens
  chunkOverlap: 200,         // tokens
  
  // Metadata enrichment
  includeMetadata: {
    documentId: true,
    documentType: true,      // '10-K', '분기보고서', etc.
    section: true,           // 'MD&A', 'Risk Factors', '주석'
    pageNumber: true,
    language: true,          // 'en', 'ko'
  },
  
  // Special handling
  preserveTables: true,      // Keep tables as single chunks
  preserveFootnotes: true,   // Don't split footnotes
  sectionAware: true,        // Respect section boundaries
}
```

### 5.4 Query Processing

```typescript
interface QueryProcessor {
  // Pre-processing
  detectLanguage(query: string): 'en' | 'ko';
  extractEntities(query: string): Entity[];
  identifyQueryType(query: string): QueryType;
  
  // Context gathering
  getActiveContext(): {
    currentDocument: string;
    currentPage: number;
    selectedFootnote?: string;
    conversationHistory: Message[];
  };
  
  // Query enhancement
  rewriteQuery(query: string, context: Context): string;
}

type QueryType = 
  | 'summarize'           // "Summarize this note"
  | 'compare'             // "Compare to last year"
  | 'explain'             // "Explain this policy"
  | 'extract'             // "What was revenue?"
  | 'cross-reference'     // "Show related footnotes"
  | 'general';            // Free-form question
```

### 5.5 Response Generation

```typescript
interface ResponseGenerator {
  // Prompt template
  systemPrompt: `You are a financial document analyst assistant.
    You answer questions based ONLY on the provided document context.
    Always cite your sources with [Source: Document, Page X].
    If information is not in the context, say "I couldn't find this in the document."
    For Korean documents, respond in Korean.`;
  
  // Response structure
  generateResponse(
    query: string,
    retrievedChunks: Chunk[],
    context: QueryContext
  ): Promise<{
    answer: string;
    citations: Citation[];
    confidence: number;
    followUpSuggestions: string[];
  }>;
}

interface Citation {
  documentId: string;
  page: number;
  section: string;
  excerpt: string;          // Exact quoted text
  relevanceScore: number;
}
```

### 5.6 Korean Language Support (QT-69)

```typescript
// Korean-specific processing
const koreanProcessor = {
  // Query suggestions
  suggestions: [
    { label: "이 주석 요약", query: "이 주석의 핵심 내용을 요약해줘" },
    { label: "전년 비교", query: "전년도 동일 항목과 비교해줘" },
    { label: "회계정책", query: "적용된 회계정책을 설명해줘" },
    { label: "연결/별도", query: "연결재무제표와 별도재무제표 차이점은?" },
  ],
  
  // Response formatting
  formatCitation: (page: number, section: string) => 
    `[출처: ${section}, p.${page}]`,
  
  // Number formatting
  formatNumber: (num: number) => 
    new Intl.NumberFormat('ko-KR').format(num) + '원',
};
```

---

## 6. API Specifications

### 6.1 Document Upload & Processing

```typescript
// POST /api/documents/upload
interface UploadRequest {
  file: File;                        // Multipart file
  metadata?: {
    company?: string;
    documentType?: string;
    fiscalYear?: number;
    language?: 'en' | 'ko';
  };
}

interface UploadResponse {
  documentId: string;
  status: 'processing' | 'ready' | 'error';
  pages: number;
  extractedSections: string[];
  footnoteCount: number;
  processingTime: number;            // ms
}
```

### 6.2 Footnote Retrieval

```typescript
// GET /api/documents/{docId}/footnotes
interface FootnoteListResponse {
  footnotes: ParsedFootnote[];
  totalCount: number;
}

// GET /api/documents/{docId}/footnotes/{footnoteId}
interface FootnoteDetailResponse {
  footnote: ParsedFootnote;
  relatedFootnotes: ParsedFootnote[];
  aiSummary?: string;                // Pre-generated summary
}
```

### 6.3 AI Query

```typescript
// POST /api/ai/query
interface AIQueryRequest {
  query: string;
  documentId: string;
  context?: {
    currentPage?: number;
    selectedFootnote?: string;
    conversationId?: string;
  };
  options?: {
    includePriorYear?: boolean;
    crossDocumentSearch?: boolean;
    maxTokens?: number;
  };
}

interface AIQueryResponse {
  answer: string;
  citations: Citation[];
  confidence: number;
  processingTime: number;            // ms
  tokensUsed: number;
  followUpSuggestions: string[];
}

// WebSocket /api/ai/stream
// For streaming responses
interface AIStreamMessage {
  type: 'token' | 'citation' | 'done' | 'error';
  content: string;
}
```

---

## 7. Technical Architecture

### 7.1 System Architecture

```
+------------------+     +------------------+     +------------------+
|    Frontend      |     |    Backend       |     |   AI Services    |
|    (Next.js)     | <-> |    (Node.js)     | <-> |   (Python/LLM)   |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        v                        v                        v
+------------------+     +------------------+     +------------------+
| Static Assets    |     | PostgreSQL       |     | Vector DB        |
| (PDF, etc.)      |     | (Metadata)       |     | (Embeddings)     |
+------------------+     +------------------+     +------------------+
```

### 7.2 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+, TypeScript, Tailwind CSS |
| Backend API | Next.js API Routes or Express.js |
| Database | PostgreSQL (metadata) + Vector DB (embeddings) |
| Document Processing | pdf-parse, mammoth, xlsx, custom XBRL |
| AI/ML | LangChain, OpenAI API, Vector DB |
| File Storage | Local / S3-compatible |
| Caching | Redis (optional) |

### 7.3 Component Structure

```
src/
|-- app/
|   |-- page.tsx
|   |-- api/
|   |   |-- documents/
|   |   |   |-- upload/route.ts
|   |   |   +-- [docId]/
|   |   |       |-- route.ts
|   |   |       +-- footnotes/route.ts
|   |   +-- ai/
|   |       |-- query/route.ts
|   |       +-- stream/route.ts
|   +-- layout.tsx
|-- components/
|   |-- LandingPage/
|   |-- DocumentViewer/
|   |-- FootnoteSystem/
|   +-- AIAssistant/
|-- lib/
|   |-- parsers/
|   |   |-- pdf.ts
|   |   |-- docx.ts
|   |   |-- excel.ts
|   |   |-- xbrl.ts
|   |   +-- index.ts
|   |-- footnotes/
|   |   |-- detector.ts
|   |   |-- extractor.ts
|   |   +-- korean.ts
|   |-- ai/
|   |   |-- embeddings.ts
|   |   |-- vectorStore.ts
|   |   |-- ragPipeline.ts
|   |   +-- llm.ts
|   +-- db/
|       |-- schema.ts
|       +-- queries.ts
+-- scripts/
    |-- processDocument.ts
    +-- buildIndex.ts
```

---

## 8. Performance Requirements

### 8.1 Response Time Targets

| Operation | Target | Maximum |
|-----------|--------|---------|
| Document upload (10MB PDF) | < 5s | 15s |
| Page navigation | < 100ms | 300ms |
| Footnote popup render | < 50ms | 100ms |
| AI query (simple) | < 2s | 5s |
| AI query (complex/cross-doc) | < 5s | 10s |
| AI streaming first token | < 500ms | 1s |

### 8.2 Quality Targets

| Metric | Target |
|--------|--------|
| Footnote detection accuracy | > 95% |
| Citation accuracy | > 95% |
| AI hallucination rate | < 5% |
| Korean text handling | 100% parity with English |

---

## 9. Success Criteria

### 9.1 Core Functionality

- [ ] Upload any PDF and view in document viewer
- [ ] Upload Word document and extract content
- [ ] Upload Excel and display as table
- [ ] Real-time footnote detection in uploaded documents
- [ ] Footnote popup shows extracted content from document
- [ ] AI Q&A responds based on document content
- [ ] AI citations link to correct page/section
- [ ] Korean footnotes (주석) detected and parsed
- [ ] Korean AI Q&A works correctly
- [ ] Cross-reference navigation works

### 9.2 Integration

- [ ] Mock-up UI unchanged (pixel-perfect match)
- [ ] All mock interactions replaced with real backends
- [ ] Canned responses replaced with LLM responses
- [ ] Pre-defined footnotes replaced with parsed content

### 9.3 Quality

- [ ] No hardcoded document-specific logic
- [ ] Works with any uploaded document
- [ ] Graceful error handling
- [ ] Loading states for all async operations

---

## 10. Security & Privacy

| Concern | Mitigation |
|---------|------------|
| Document confidentiality | Process locally, no third-party storage |
| LLM data privacy | Use enterprise API endpoints (no training) |
| API security | Authentication required for all endpoints |
| File upload security | Virus scanning, size limits, type validation |

---

## 11. Deliverables

1. **Full Next.js application** with real backends
2. **Document processing pipeline** (PDF, Word, Excel, CSV)
3. **AI/RAG system** with vector DB and LLM integration
4. **API documentation** (OpenAPI/Swagger)
5. **Deployment scripts** (Docker, env configuration)
6. **Test suite** (unit + integration tests)

---

## 12. Migration from Mock-up

### 12.1 What Changes

| Component | Mock-up | Full Functional |
|-----------|---------|-----------------|
| `data/*.json` | Hardcoded | Database + API |
| `FootnotePopup` | Props from JSON | Fetches from `/api/footnotes` |
| `AIResponse` | Pattern match | Calls `/api/ai/query` |
| `PDFViewer` | Static file | Dynamic + parsed metadata |

### 12.2 What Stays Same

- All React components (UI unchanged)
- CSS/Tailwind styling
- User interaction patterns
- Korean language support
- Responsive behavior

---

## 13. Future Roadmap (Post-POC)

### Phase 2 (Week 2)
- Multi-document comparison
- Prior year auto-fetch
- Export/reporting

### Phase 3 (Week 3-4)
- User workspaces
- Document upload portal
- Collaboration features

### Phase 4 (Month 2+)
- Enterprise deployment
- SSO integration
- Audit logging

---

*Document maintained by: Development Team*  
*Created: 2025-12-08*  
*For Mock-up PRD, see: [PRD_Mockup.md](./PRD_Mockup.md)*
