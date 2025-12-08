# PRD: Factset Audit POC - Document Viewer Prototype

**Version:** 1.0  
**Date:** 2025-12-08  
**Status:** In Progress  
**Related Issues:** [QT-46](https://linear.app/betalgeuse/issue/QT-46), [QT-65](https://linear.app/betalgeuse/issue/QT-65)  
**Project Name:** audit

---

## 1. Executive Summary

### 1.1 Product Vision
A unified workspace that enables users to efficiently audit, analyze, and research financial documents. The platform allows users to track identical line items (e.g., operating profit) across multiple years and 10-K filings, while instantly verifying numbers and footnote locations in original source documents.

### 1.2 POC Objective
Build a rapid Next.js prototype demonstrating the core value proposition: **"Click a number → View source document → See highlighted location"**

### 1.3 Target Users
- Financial Analysts
- Auditors
- Institutional Investors
- Research Teams

---

## 2. Scope Definition

### 2.1 In Scope (POC)

| Feature | Priority | Description |
|---------|----------|-------------|
| Landing Page Table | P0 | GAAP/IFRS Income Statement with clickable cells |
| Document Viewer Popup | P0 | Modal displaying source PDF with navigation |
| Clickable Number Cells | P0 | Hover states + click to open viewer |
| Section Navigation | P0 | Left sidebar TOC in Document Viewer |
| Auto-scroll to Section | P0 | Navigate to relevant document section |
| Highlight Display | P0 | Yellow highlight on related data |
| Close Functionality | P0 | ESC key, X button, outside click |
| KR/US Market Tabs | P1 | Toggle between AMAT (US) and SK Hynix (KR) |

### 2.2 UI Mockup Only (Non-functional)

| Feature | Description |
|---------|-------------|
| Flagging/Bookmark | UI buttons visible, no backend logic |
| AI Summarize/Q&A | UI placeholders only |
| Cross-document Tracking | Visual indicators only |
| Footnote Popup | Mockup scroll animation |
| Notes/Annotations | UI elements without persistence |

### 2.3 Out of Scope

- PDF download functionality
- Export features
- Full-text search within documents
- Zoom controls
- Precise document-to-data mapping logic
- Real-time data feeds
- User authentication
- Data persistence

---

## 3. User Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LANDING PAGE                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [US Market] [KR Market]                                       │  │
│  │                                                                │  │
│  │  Company: Applied Materials, Inc. (AMAT)  |  $268.00          │  │
│  │  ─────────────────────────────────────────────────────────────│  │
│  │  GAAP/IFRS Income Statement                                   │  │
│  │  ┌──────────────┬────────┬────────┬────────┬────────┐        │  │
│  │  │              │ FY15   │ FY16   │ FY17   │ FY25   │        │  │
│  │  ├──────────────┼────────┼────────┼────────┼────────┤        │  │
│  │  │ Sales        │ [9,659]│[10,825]│[14,537]│        │ ← Click│  │
│  │  │ COGS         │  6,706 │  6,202 │  8,020 │        │        │  │
│  │  │ Gross Income │  2,953 │  4,623 │  6,517 │        │        │  │
│  │  │ Net Income   │  1,377 │  1,721 │  3,434 │        │        │  │
│  │  └──────────────┴────────┴────────┴────────┴────────┘        │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ Click number cell
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   DOCUMENT VIEWER POPUP                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  FACTSET | Document Viewer                              [X]   │  │
│  │  ─────────────────────────────────────────────────────────────│  │
│  │  Entity: APPLIED MATERIALS INC /DE                            │  │
│  │  Filing Type: 10-K  |  End Date: 2017-10-29                  │  │
│  │  ┌────────────────┬───────────────────────────────────────┐  │  │
│  │  │ [Navigation]   │  [Document Content]                    │  │  │
│  │  │                │                                        │  │  │
│  │  │ Cover          │  Consolidated Balance Sheets           │  │  │
│  │  │ Document Info  │  (USD $) In Millions                  │  │  │
│  │  │                │  ┌─────────────────────────────────┐  │  │  │
│  │  │ Financial      │  │              │ Oct 2017│Oct 2016│  │  │  │
│  │  │ Statements     │  ├──────────────┼─────────┼────────┤  │  │  │
│  │  │  ├ Income      │  │ Cash & equiv │ [5,010] │  3,406 │  │  │  │
│  │  │  ├ Balance ◄   │  │ Short-term   │  2,266  │   343  │  │  │  │
│  │  │  └ Cash Flow   │  └─────────────────────────────────┘  │  │  │
│  │  │                │         ▲                              │  │  │
│  │  │ Notes          │    Highlighted cell                    │  │  │
│  │  └────────────────┴───────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Data Specifications

### 4.1 US Market (AMAT)

**Company:** Applied Materials, Inc.  
**Ticker:** AMAT  
**Document:** 10-K Annual Report

**Income Statement Data:**

| Line Item | FY15 | FY16 | FY17 | FY18 | FY19 | FY20 | FY21 | FY22 | FY23 | FY24 |
|-----------|------|------|------|------|------|------|------|------|------|------|
| Sales | 9,659 | 10,825 | 14,537 | 17,253 | 14,608 | 17,202 | 23,063 | 25,785 | 26,517 | 27,176 |
| Cost of Goods | 6,706 | 6,202 | 8,020 | 9,346 | 8,265 | 9,657 | 12,835 | 14,450 | 14,731 | 14,849 |
| Gross Income | 2,953 | 4,623 | 6,517 | 7,907 | 6,343 | 7,545 | 10,228 | 11,335 | 11,786 | 12,327 |
| Net Income | 1,377 | 1,721 | 3,434 | 3,313 | 2,706 | 3,619 | 5,888 | 6,525 | 6,856 | 7,177 |

**Document Viewer Highlight:**
- Balance Sheet: Cash and cash equivalents **$5,010M** (Oct 2017)

### 4.2 KR Market (SK Hynix)

**Company:** SK Hynix Inc.  
**Document:** 연결감사보고서 (Consolidated Audit Report)

**연결포괄손익계산서 (Consolidated Statement of Comprehensive Income):**

| 과목 | 주석 | 제75기 (2022) | 제74기 (2021) |
|------|------|---------------|---------------|
| Ⅰ. 매출액 | 4,26,33 | 44,621,568 | **42,997,792** |
| Ⅱ. 매출원가 | 28,33 | 28,993,713 | 24,045,600 |
| Ⅲ. 매출총이익 | | 15,627,855 | 18,952,192 |

**Document Viewer Highlight:**
- 매출액 **42,997,792** (백만원, 제74기)

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14+ (App Router) | Rapid prototyping, SSR support |
| UI Framework | Tailwind CSS | Fast styling, responsive design |
| PDF Rendering | iframe / react-pdf | Simple integration, smooth scroll |
| State Management | React useState/Context | Lightweight, POC-appropriate |
| Language | TypeScript | Type safety, better DX |

### 5.2 Component Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   └── globals.css
├── components/
│   ├── LandingPage/
│   │   ├── FinancialTable.tsx
│   │   ├── MarketTabs.tsx
│   │   └── ClickableCell.tsx
│   ├── DocumentViewer/
│   │   ├── ViewerModal.tsx
│   │   ├── Navigation.tsx
│   │   ├── DocumentContent.tsx
│   │   └── HighlightOverlay.tsx
│   └── common/
│       ├── Modal.tsx
│       └── Button.tsx
├── data/
│   ├── amat-financials.json
│   ├── skhynix-financials.json
│   └── document-mapping.json
├── hooks/
│   └── useDocumentViewer.ts
└── types/
    └── index.ts
```

### 5.3 Data Flow

```
┌─────────────┐    Click Cell    ┌──────────────────┐
│ Landing     │ ───────────────► │ Document Viewer  │
│ Page        │                  │ Modal            │
└─────────────┘                  └──────────────────┘
      │                                   │
      │                                   │
      ▼                                   ▼
┌─────────────┐                  ┌──────────────────┐
│ Financial   │                  │ PDF Iframe/      │
│ Data JSON   │                  │ React-PDF        │
└─────────────┘                  └──────────────────┘
      │                                   │
      └───────────────┬───────────────────┘
                      │
                      ▼
              ┌──────────────────┐
              │ Document Mapping │
              │ (cell → section) │
              └──────────────────┘
```

---

## 6. UI/UX Specifications

### 6.1 Landing Page Table

**Hover State:**
```css
.clickable-cell:hover {
  background-color: #E8F4FD;
  cursor: pointer;
}
.clickable-cell:hover::after {
  content: "Click to view source";
  /* tooltip styles */
}
```

### 6.2 Document Viewer Modal

**Dimensions:**
- Width: 90vw (max 1400px)
- Height: 85vh
- Navigation sidebar: 250px fixed

**Highlight Style:**
```css
.highlighted-row {
  background-color: #FFEB3B;
  font-weight: bold;
  border: 2px solid #FFC107;
  animation: pulse 2s ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### 6.3 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Full layout with sidebar |
| Tablet (768-1024px) | Collapsible sidebar |
| Mobile (<768px) | Full-screen modal, hidden sidebar |

---

## 7. Interaction Specifications

### 7.1 Cell Click Flow

1. **Hover** (0ms)
   - Background color change
   - Cursor: pointer
   - Tooltip appears after 500ms delay

2. **Click** (0ms)
   - Loading spinner appears
   - Fetch document mapping

3. **Modal Open** (<300ms)
   - Fade-in animation
   - Background dimmed (rgba(0,0,0,0.5))

4. **Document Load** (<1000ms)
   - PDF renders in viewer
   - Auto-scroll to target section
   - Highlight animation plays

### 7.2 Close Behaviors

| Trigger | Action |
|---------|--------|
| X Button | Close modal |
| ESC Key | Close modal |
| Outside Click | Close modal (optional) |
| Back Button | Close modal |

---

## 8. Assets Required

### 8.1 PDF Documents

| Document | Market | Status | Location |
|----------|--------|--------|----------|
| AMAT 10-K | US | ✅ Available | `assets/pdfs/AMAT_10K.pdf` |
| SK Hynix 감사보고서 | KR | ✅ Available | `assets/pdfs/SK_Hynix_10K.pdf` |

### 8.2 Screen Recordings (Reference)

| Recording | Purpose | Status | Location |
|-----------|---------|--------|----------|
| factset audit_amat_us.mp4 | US market flow demo | ✅ Available | `assets/recordings/` |
| factset audit_sk hynix_korea.mp4 | KR market flow demo | ✅ Available | `assets/recordings/` |

---

## 9. Success Criteria

### 9.1 Functional Requirements

- [ ] User can view financial data table on landing page
- [ ] User can switch between US and KR market views
- [ ] User can click any numeric cell to open Document Viewer
- [ ] Document Viewer displays correct source PDF
- [ ] Document auto-scrolls to relevant section
- [ ] Relevant data is highlighted in document
- [ ] User can navigate document via sidebar TOC
- [ ] User can close modal via X, ESC, or outside click

### 9.2 Performance Targets

| Metric | Target |
|--------|--------|
| Initial Page Load | < 2s |
| Modal Open Animation | < 300ms |
| PDF Load Time | < 1.5s |
| Scroll to Section | < 500ms |

---

## 10. Future Roadmap (Post-POC)

### Phase 2: Enhanced Document Intelligence
- Precise number-to-location mapping
- Cross-document data tracking
- Footnote popup functionality
- Bookmark persistence

### Phase 3: AI Integration
- Document summarization
- Q&A capabilities
- Automated data extraction
- Anomaly detection

### Phase 4: Full Product
- Multi-user workspaces
- Document upload pipeline
- Real-time collaboration
- Export and reporting

---

## 11. Appendix

### A. Related Linear Issues

| Issue | Title | Status |
|-------|-------|--------|
| [QT-46](https://linear.app/betalgeuse/issue/QT-46) | Factset 목업 화면 녹화와 PDF 자료 요청 | In Progress |
| [QT-65](https://linear.app/betalgeuse/issue/QT-65) | Create new PRD for Factset audit POC | In Progress |

### B. Reference Materials

- AMAT 10-K (FY2017): Consolidated Balance Sheets
- SK Hynix 연결감사보고서: 연결포괄손익계산서
- Factset Document Viewer UI mockups (Linear attachments)
- Screen recording demos (Linear attachments)

### C. Industry Best Practices Applied

1. **Source Provenance Tracking**: Every displayed number links to its original document location
2. **Audit Trail Support**: Clear visual connection between data and source
3. **Cross-Document Navigation**: TOC sidebar for efficient document exploration
4. **Responsive Design**: Works across desktop and mobile devices
5. **Performance Optimization**: Lazy loading for PDF content

---

*Document maintained by: Development Team*  
*Last updated: 2025-12-08*
