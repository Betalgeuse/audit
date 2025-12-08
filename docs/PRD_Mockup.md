# PRD: Factset Audit POC - Mock-up Version

**Version:** 1.0  
**Date:** 2025-12-08  
**Delivery:** Today  
**Type:** UI/UX Teaser Demo  
**Related Issues:** [QT-46](https://linear.app/betalgeuse/issue/QT-46), [QT-65](https://linear.app/betalgeuse/issue/QT-65), [QT-69](https://linear.app/betalgeuse/issue/QT-69)

---

## 1. Overview

### 1.1 Purpose
A **visual teaser demo** that showcases the full user experience of the Factset Audit POC. All UI interactions work, but data is hardcoded and AI responses are pre-written realistic canned responses.

### 1.2 Key Principle
> **What users see in the mock-up is exactly what they will get in the full version.**

The mock-up serves as a binding visual contract for the full functional release.

### 1.3 Delivery Timeline
- **Mock-up:** Today (2025-12-08)
- **Full Functional:** 2 days (2025-12-10)

---

## 2. Scope Summary

| Feature | Mock-up Behavior | Appears Functional? |
|---------|------------------|---------------------|
| Landing Page Table | Hardcoded JSON | Yes |
| Market Tabs (US/KR) | Static toggle | Yes |
| Cell Click -> Document Viewer | Opens modal | Yes |
| PDF Viewer | Static embedded PDF | Yes |
| Section Navigation (TOC) | Scrolls to anchors | Yes |
| Highlight on Target Data | CSS animation | Yes |
| Footnote Hover Popup | Pre-defined content | Yes |
| Cross-Reference Preview | Pre-defined content | Yes |
| Pinned Sidenote Panel | Static content | Yes |
| AI Q&A Panel | Canned responses | Yes (appears real) |
| Korean 주석 Popup (QT-69) | Pre-defined + fake AI | Yes |

---

## 3. Data Sources (Mock-up)

### 3.1 PDF Documents
Download from Linear attachments:
- `AMAT_10K_2017.pdf` - Applied Materials 10-K (US)
- `SK_Hynix_분기보고서_2024.pdf` - SK Hynix Quarterly Report (KR)

### 3.2 Financial Data (Hardcoded JSON)

```json
// data/amat-financials.json
{
  "company": "Applied Materials, Inc.",
  "ticker": "AMAT",
  "market": "US",
  "currency": "USD",
  "unit": "millions",
  "incomeStatement": [
    { "item": "Sales", "FY15": 9659, "FY16": 10825, "FY17": 14537, "FY18": 17253, "FY19": 14608 },
    { "item": "Cost of Goods", "FY15": 6706, "FY16": 6202, "FY17": 8020, "FY18": 9346, "FY19": 8265 },
    { "item": "Gross Income", "FY15": 2953, "FY16": 4623, "FY17": 6517, "FY18": 7907, "FY19": 6343 },
    { "item": "Net Income", "FY15": 1377, "FY16": 1721, "FY17": 3434, "FY18": 3313, "FY19": 2706 }
  ],
  "documentMapping": {
    "Sales|FY17": { "page": 45, "section": "income-statement", "highlight": "14,537" },
    "Net Income|FY17": { "page": 45, "section": "income-statement", "highlight": "3,434" }
  }
}
```

```json
// data/skhynix-financials.json
{
  "company": "SK Hynix Inc.",
  "ticker": "000660.KS",
  "market": "KR",
  "currency": "KRW",
  "unit": "백만원",
  "incomeStatement": [
    { "item": "매출액", "주석": "4,26,33", "제5기": 44621568, "제4기": 42997792 },
    { "item": "매출원가", "주석": "28,33", "제5기": 28993713, "제4기": 24045600 },
    { "item": "매출총이익", "주석": "", "제5기": 15627855, "제4기": 18952192 }
  ],
  "documentMapping": {
    "매출액|제4기": { "page": 12, "section": "consolidated-income", "highlight": "42,997,792" }
  }
}
```

### 3.3 Footnote Definitions (Hardcoded)

```json
// data/footnotes-amat.json
{
  "footnotes": [
    {
      "id": "note-4",
      "marker": "Note 4",
      "triggerPatterns": ["See Note 4", "(Note 4)", "Note 4"],
      "title": "Cash and Cash Equivalents",
      "preview": "The Company considers all highly liquid investments with original maturities of three months or less...",
      "fullContent": "Note 4: Cash and Cash Equivalents\n\nThe Company considers all highly liquid investments with original maturities of three months or less at the date of purchase to be cash equivalents. Cash equivalents consist primarily of money market funds and time deposits.\n\nAs of October 29, 2017, cash and cash equivalents totaled $5,010 million, of which $4,212 million was held by foreign subsidiaries.",
      "targetPage": 67
    },
    {
      "id": "asc-606",
      "marker": "1",
      "triggerPatterns": ["ASC 606¹", "ASC 606[1]", "[1]"],
      "title": "ASC 606 - Revenue Recognition",
      "preview": "Revenue from Contracts with Customers, effective for fiscal years beginning after December 15, 2017.",
      "fullContent": "ASC 606 - Revenue from Contracts with Customers establishes a comprehensive framework for determining when and how much revenue to recognize. The standard requires revenue recognition when control of goods or services transfers to customers.",
      "targetPage": null
    }
  ]
}
```

```json
// data/footnotes-skhynix.json
{
  "footnotes": [
    {
      "id": "jushuk-5",
      "marker": "(주5,6)",
      "triggerPatterns": ["(주5,6)", "(주5, 6)", "주5", "주6"],
      "title": "주석 5: 매출액",
      "preview": "회사는 한국채택국제회계기준 제1115호에 따라 매출액을 인식합니다...",
      "fullContent": "주석 5: 매출액\n\n회사는 한국채택국제회계기준 제1115호에 따라 고객과의 계약에서 발생하는 수익을 인식합니다. 수익은 고객에게 약속한 재화나 용역을 이전하여 수행의무를 이행할 때 인식합니다.\n\n당기 매출액: ₩44,621,568백만원\n전기 매출액: ₩42,997,792백만원\n증감: +₩1,623,776백만원 (+3.8%)",
      "targetPage": 45
    },
    {
      "id": "jushuk-28",
      "marker": "(주28)",
      "triggerPatterns": ["(주28)", "주28", "주석 28"],
      "title": "주석 28: 매출원가",
      "preview": "매출원가는 제품의 제조원가와 판매된 상품의 매입원가로 구성됩니다...",
      "fullContent": "주석 28: 매출원가\n\n매출원가는 제품의 제조원가와 판매된 상품의 매입원가로 구성됩니다. 제조원가에는 원재료비, 노무비, 제조경비가 포함됩니다.",
      "targetPage": 78
    }
  ]
}
```

---

## 4. AI Q&A Canned Responses

### 4.1 Design Principle
Canned responses should:
- Look realistic (proper formatting, citations)
- Include source references with page numbers
- Match the style of actual LLM responses
- Cover common query patterns

### 4.2 English Canned Responses (AMAT)

```json
// data/ai-responses-amat.json
{
  "responses": [
    {
      "triggers": ["summarize", "summary", "what does this say"],
      "context": "note-4",
      "response": "**Summary of Note 4: Cash and Cash Equivalents**\n\n• The Company holds $5,010 million in cash and equivalents as of Oct 2017\n• $4,212 million (84%) is held by foreign subsidiaries\n• Cash equivalents include money market funds and time deposits with maturities ≤3 months\n\n[Source: 10-K FY2017, Note 4, p.67]"
    },
    {
      "triggers": ["prior year", "last year", "previous year", "yoy", "year over year"],
      "context": "note-4",
      "response": "**Year-over-Year Comparison: Cash Position**\n\n| Metric | FY2017 | FY2016 | Change |\n|--------|--------|--------|--------|\n| Cash & Equivalents | $5,010M | $3,406M | +$1,604M (+47%) |\n\nThe increase was primarily driven by:\n• Strong operating cash flow from semiconductor equipment demand\n• Reduced capital expenditure spending\n\n[Source: 10-K FY2017 p.67, FY2016 p.65]"
    },
    {
      "triggers": ["risk", "risks", "risk factor"],
      "context": "general",
      "response": "**Key Risk Factors (FY2017)**\n\n1. **Cyclical Industry**: Semiconductor industry is highly cyclical\n2. **Customer Concentration**: Top 10 customers = 58% of revenue\n3. **Global Operations**: Currency fluctuations, trade policies\n4. **Technology Changes**: Rapid pace of innovation\n\n[Source: 10-K FY2017, Item 1A Risk Factors, p.12-25]"
    },
    {
      "triggers": ["revenue", "sales", "top line"],
      "context": "general",
      "response": "**Revenue Analysis FY2017**\n\nTotal Revenue: $14,537 million (+34% YoY)\n\n**By Segment:**\n• Semiconductor Systems: $9,824M (68%)\n• Applied Global Services: $3,456M (24%)\n• Display: $1,257M (8%)\n\n**By Geography:**\n• Taiwan: 26%\n• China: 22%\n• Korea: 20%\n• Japan: 13%\n• US: 11%\n\n[Source: 10-K FY2017, p.45-47]"
    }
  ],
  "defaultResponse": "I found relevant information in the document, but I need more specific context to provide a detailed answer. Could you:\n\n• Click on a specific cell or footnote first, or\n• Ask about a specific topic (revenue, cash, risks, etc.)\n\n[Searching: AMAT 10-K FY2017]"
}
```

### 4.3 Korean Canned Responses (SK Hynix)

```json
// data/ai-responses-skhynix.json
{
  "responses": [
    {
      "triggers": ["요약", "요약해", "요약해줘", "summarize"],
      "context": "jushuk-5",
      "response": "**주석 5 요약: 매출액 인식**\n\n• 회사는 K-IFRS 제1115호에 따라 수익을 인식합니다\n• 수행의무 이행 시점에 수익을 인식\n• 당기 매출액: ₩44,621,568백만원 (+3.8% YoY)\n\n**주요 매출 구성:**\n• DRAM: 약 72%\n• NAND Flash: 약 26%\n• 기타: 약 2%\n\n[출처: 분기보고서 2024.11, 주석 5, p.45]"
    },
    {
      "triggers": ["작년", "전년", "전기", "yoy", "비교"],
      "context": "jushuk-5",
      "response": "**전년 대비 매출액 비교**\n\n| 구분 | 당기(2024) | 전기(2023) | 증감 |\n|------|------------|------------|------|\n| 매출액 | ₩44,621,568M | ₩42,997,792M | +3.8% |\n| 매출원가 | ₩28,993,713M | ₩24,045,600M | +20.6% |\n| 매출총이익 | ₩15,627,855M | ₩18,952,192M | -17.5% |\n\n매출총이익률 하락 원인:\n• 메모리 반도체 가격 하락\n• 원재료비 상승\n\n[출처: 분기보고서 2024.11, p.12]"
    },
    {
      "triggers": ["연결", "별도", "연결재무제표", "별도재무제표"],
      "context": "general",
      "response": "**연결 vs 별도 재무제표 비교**\n\n| 항목 | 연결 | 별도 | 차이 |\n|------|------|------|------|\n| 매출액 | ₩44,621,568M | ₩41,234,892M | +8.2% |\n| 영업이익 | ₩6,892,145M | ₩6,234,567M | +10.5% |\n\n차이 발생 원인:\n• 종속기업 실적 포함 (SK hynix America, SK hynix China 등)\n• 내부거래 제거 효과\n\n[출처: 분기보고서 2024.11, 연결/별도 재무제표]"
    },
    {
      "triggers": ["회계정책", "회계", "정책", "accounting"],
      "context": "general",
      "response": "**주요 회계정책 요약**\n\n**1. 수익인식 (K-IFRS 1115)**\n• 고객에게 재화 통제 이전 시점에 인식\n• 반품권 추정하여 환불부채 인식\n\n**2. 재고자산**\n• 이동평균법으로 평가\n• 저가법 적용 (순실현가능가치)\n\n**3. 유형자산**\n• 정액법 감가상각\n• 반도체 장비: 5-10년\n\n[출처: 분기보고서 2024.11, 주석 2-3]"
    }
  ],
  "defaultResponse": "관련 정보를 문서에서 찾고 있습니다. 더 구체적인 답변을 위해:\n\n• 특정 셀이나 주석을 먼저 클릭하시거나\n• 구체적인 주제를 질문해 주세요 (매출, 원가, 회계정책 등)\n\n[검색 중: SK하이닉스 분기보고서 2024.11]"
}
```

---

## 5. User Interface Specifications

### 5.1 Landing Page

```
+-----------------------------------------------------------------------+
| FACTSET AUDIT POC                                    [US] [KR]        |
+-----------------------------------------------------------------------+
|                                                                       |
| Company: Applied Materials, Inc. (AMAT)  |  Stock: $268.00           |
|                                                                       |
| +-------------------------------------------------------------------+ |
| | GAAP Income Statement (USD millions)                              | |
| +-------------+--------+--------+--------+--------+--------+--------+ |
| |             | FY15   | FY16   | FY17   | FY18   | FY19   |        | |
| +-------------+--------+--------+--------+--------+--------+--------+ |
| | Sales       | 9,659  | 10,825 |[14,537]| 17,253 | 14,608 | <-Click| |
| | COGS        | 6,706  | 6,202  | 8,020  | 9,346  | 8,265  |        | |
| | Gross Profit| 2,953  | 4,623  | 6,517  | 7,907  | 6,343  |        | |
| | Net Income  | 1,377  | 1,721  | 3,434  | 3,313  | 2,706  |        | |
| +-------------+--------+--------+--------+--------+--------+--------+ |
|                                                                       |
| [Clickable cells highlighted on hover with tooltip: "View source"]   |
+-----------------------------------------------------------------------+
```

### 5.2 Document Viewer Modal

```
+-----------------------------------------------------------------------------+
| FACTSET | Document Viewer                              [AI] [Pin] [X]       |
+-----------------------------------------------------------------------------+
| Entity: APPLIED MATERIALS INC    |    Filing: 10-K    |    Date: 2017-10-29 |
+-----------------------------------------------------------------------------+
|          |                                              |                    |
| [NAV]    |  [PDF CONTENT AREA]                         | [AI SIDEBAR]       |
|          |                                              |                    |
| Cover    |  +----------------------------------------+  | +----------------+ |
| -------- |  | Consolidated Statements of Operations |  | | AI Assistant   | |
| Document |  |                                        |  | +----------------+ |
| Info     |  | Net revenues........... [14,537]  <---+--+-| Ask about this | |
|          |  | Cost of products....... 8,020         |  | | document...    | |
| Financial|  | Gross profit........... 6,517         |  | |                | |
| Statements| |                                        |  | | [Summarize]    | |
|  > Income |  | [HIGHLIGHTED ROW]                     |  | | [Prior Year]   | |
|  > Balance|  |                                        |  | | [Risks]        | |
|  > Cash   |  +----------------------------------------+  | |                | |
|          |                                              | | Recent:        | |
| Notes    |  When user hovers "See Note 4":             | | > "What is..." | |
|  > Note 4|  +---------------------------+              | | > "Compare..." | |
|  > Note 5|  | Note 4: Cash & Equiv      |              | +----------------+ |
|          |  | $5,010M total, of which...|              |                    |
|          |  | [Pin] [Go to Note] [Copy] |              |                    |
|          |  +---------------------------+              |                    |
+-----------------------------------------------------------------------------+
```

### 5.3 Footnote Popup (QT-69 Korean)

```
+-----------------------------------------------------------------------------+
| 연결재무제표                                                                 |
+-----------------------------------------------------------------------------+
| 과목          | 주석      | 당기(2024)    | 전기(2023)    |                |
+---------------+-----------+---------------+---------------+                |
| I. 매출액     | (주5,6)   | 44,621,568    | 42,997,792    | <- Hover here  |
| II. 매출원가  | (주28)    | 28,993,713    | 24,045,600    |                |
+---------------+-----------+---------------+---------------+                |
                    |                                                         |
                    v                                                         |
          +-----------------------------------------------+                   |
          | 주석 5: 매출액                           [X]  |                   |
          +-----------------------------------------------+                   |
          |                                               |                   |
          | 회사는 한국채택국제회계기준 제1115호에 따라   |                   |
          | 고객과의 계약에서 발생하는 수익을 인식합니다. |                   |
          |                                               |                   |
          | 당기 매출액: ₩44,621,568백만원               |                   |
          | 전기 매출액: ₩42,997,792백만원               |                   |
          | 증감: +₩1,623,776백만원 (+3.8%)              |                   |
          |                                               |                   |
          | +-------------------------------------------+ |                   |
          | | AI 질문하기                               | |                   |
          | | [요약] [전년비교] [회계정책] [연결/별도]  | |                   |
          | | [질문 입력...]                   [전송]   | |                   |
          | +-------------------------------------------+ |                   |
          |                                               |                   |
          | [Pin to Sidebar] [Go to Full Note] [Copy]     |                   |
          +-----------------------------------------------+                   |
+-----------------------------------------------------------------------------+
```

### 5.4 AI Sidebar Interaction

```
+----------------------------------+
| AI Assistant                [X]  |
+----------------------------------+
|                                  |
| Ask about this document...       |
| +------------------------------+ |
| | What was revenue in FY17?    | |
| +------------------------------+ |
|              [Send]              |
|                                  |
| Quick Actions:                   |
| [Summarize] [Compare YoY] [Risks]|
|                                  |
+----------------------------------+
| AI Response:                     |
| -------------------------------- |
| **Revenue Analysis FY2017**      |
|                                  |
| Total Revenue: $14,537M (+34%)   |
|                                  |
| By Segment:                      |
| - Semiconductor: $9,824M (68%)   |
| - Services: $3,456M (24%)        |
| - Display: $1,257M (8%)          |
|                                  |
| [Source: 10-K p.45-47]  <- Click |
+----------------------------------+
```

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| PDF Viewer | react-pdf or iframe embed |
| State | React Context + useState |
| Language | TypeScript |

### 6.2 Component Structure

```
src/
|-- app/
|   |-- page.tsx                    # Landing page
|   |-- layout.tsx
|   +-- globals.css
|-- components/
|   |-- LandingPage/
|   |   |-- FinancialTable.tsx
|   |   |-- MarketTabs.tsx
|   |   +-- ClickableCell.tsx
|   |-- DocumentViewer/
|   |   |-- ViewerModal.tsx
|   |   |-- PDFViewer.tsx
|   |   |-- NavigationSidebar.tsx
|   |   +-- HighlightOverlay.tsx
|   |-- FootnoteSystem/
|   |   |-- FootnotePopup.tsx
|   |   |-- FootnoteMarker.tsx
|   |   +-- PinnedSidenote.tsx
|   +-- AIAssistant/
|       |-- AISidebar.tsx
|       |-- AIQueryInput.tsx
|       |-- AIResponse.tsx
|       +-- QuickActions.tsx
|-- data/
|   |-- amat-financials.json
|   |-- skhynix-financials.json
|   |-- footnotes-amat.json
|   |-- footnotes-skhynix.json
|   |-- ai-responses-amat.json
|   +-- ai-responses-skhynix.json
+-- lib/
    |-- footnoteMatching.ts         # Pattern matching for triggers
    +-- aiResponseMatching.ts       # Canned response lookup
```

### 6.3 Key Implementation Notes

**Footnote Detection (Mock):**
```typescript
// Simple pattern matching against predefined triggers
function findFootnote(text: string, footnotes: Footnote[]): Footnote | null {
  for (const fn of footnotes) {
    for (const pattern of fn.triggerPatterns) {
      if (text.includes(pattern)) return fn;
    }
  }
  return null;
}
```

**AI Response Matching (Mock):**
```typescript
// Match user query to canned responses
function getAIResponse(query: string, context: string, responses: Response[]): string {
  const queryLower = query.toLowerCase();
  for (const resp of responses) {
    if (resp.triggers.some(t => queryLower.includes(t)) && 
        (!resp.context || resp.context === context)) {
      return resp.response;
    }
  }
  return defaultResponse;
}
```

---

## 7. Success Criteria (Mock-up)

### 7.1 Functional Checklist

- [ ] Landing page displays financial table with hardcoded data
- [ ] US/KR market tabs switch between AMAT and SK Hynix
- [ ] Clicking any cell opens Document Viewer modal
- [ ] PDF displays correctly in viewer
- [ ] Navigation sidebar shows document sections
- [ ] Clicking nav item scrolls to section
- [ ] Target data row is highlighted
- [ ] Hovering footnote marker shows popup
- [ ] Popup displays pre-defined content
- [ ] "Go to Note" button scrolls to full note
- [ ] "Pin" button adds to sidebar
- [ ] AI sidebar displays with query input
- [ ] Quick action buttons populate query
- [ ] Submitting query shows canned response
- [ ] Response includes clickable citations
- [ ] Korean (주석) popups work identically
- [ ] Korean AI responses display correctly
- [ ] Modal closes via X, ESC, or outside click

### 7.2 Visual Quality

- [ ] UI matches design specifications
- [ ] Animations are smooth (300ms transitions)
- [ ] Responsive on desktop (1024px+)
- [ ] Korean text renders correctly
- [ ] PDF text is readable
- [ ] Highlights are visible but not obtrusive

---

## 8. Deliverables

1. **Working Next.js application** with all mock interactions
2. **PDF files** embedded (`/public/pdfs/`)
3. **JSON data files** for financials, footnotes, AI responses
4. **Deployed preview** (Vercel or similar)
5. **Git repository** with clean commit history

---

## 9. What's NOT Included (Deferred to Full Version)

| Feature | Mock-up | Full Version |
|---------|---------|--------------|
| Real API calls | No | Yes |
| Real PDF parsing | No | Yes |
| Real LLM/RAG | No | Yes |
| Multi-document upload | No | Yes |
| User authentication | No | TBD |
| Data persistence | No | Yes |
| File format support (Word, Excel, XBRL) | No | Yes |

---

*Document maintained by: Development Team*  
*Created: 2025-12-08*  
*For Full Functional PRD, see: [PRD_Full_Functional.md](./PRD_Full_Functional.md)*
