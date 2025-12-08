# PRD: Factset Audit POC - Document Viewer Prototype

**Version:** 1.1  
**Date:** 2025-12-08  
**Status:** In Progress  
**Related Issues:** [QT-46](https://linear.app/betalgeuse/issue/QT-46), [QT-65](https://linear.app/betalgeuse/issue/QT-65), [QT-69](https://linear.app/betalgeuse/issue/QT-69)  
**Project Name:** audit

---

## 1. Executive Summary

### 1.1 Product Vision
A unified workspace that enables users to efficiently audit, analyze, and research financial documents. The platform allows users to track identical line items (e.g., operating profit) across multiple years and 10-K filings, while instantly verifying numbers and footnote locations in original source documents.

### 1.2 POC Objective
Build a rapid Next.js prototype demonstrating the core value proposition: **"Click a number ??View source document ??See highlighted location"**

### 1.3 Target Users
- Financial Analysts
- Auditors
- CPA
- Institutional Investors
- Research Teams
- Law Firm
- Policy Makers
- Investment Managements
- Hedge Funds
- Consulting Firms

---

## 2. Scope Definition

### 2.1 In Scope (POC)

| Feature | Priority | Description |
|---------|----------|-------------|
| Landing Page Table | P0 | GAAP/IFRS Financial Statement with clickable cells |
| Document Viewer Popup | P0 | Modal displaying source PDF with navigation/ Footnote and Reference popups|
| Clickable Number Cells | P0 | Hover states + click to open viewer |
| Section Navigation | P0 | Left sidebar TOC in Document Viewer |
| Auto-scroll to Section | P0 | Navigate to relevant document section |
| Highlight Display | P0 | Yellow highlight on related data |
| Close Functionality | P0 | ESC key, X button, outside click |
| KR/US Market Tabs | P1 | Toggle between AMAT (US) and SK Hynix (KR) |

### 2.2 Footnote, Reference & Appendix Popup System (P0 - Core Feature)

The inline popup system is a **core differentiating feature** that eliminates the need for users to scroll back and forth between the main content and reference sections. This significantly improves the reading experience for financial analysts and auditors working with complex 10-K documents.

| Feature | Priority | Description |
|---------|----------|-------------|
| Footnote Hover Popup | P0 | Hover over footnote markers (e.g., ¹, ², *) to see content inline |
| Reference Link Preview | P0 | Click/hover on "See Note 12" to preview that note section |
| Appendix Quick View | P0 | Inline preview of appendix content without navigation |
| Smart Positioning | P0 | Popup appears near cursor, avoids viewport edges |
| Persistent Mode | P1 | Click to pin popup, continue reading with reference visible |

### 2.3 UI Mockup Only (Non-functional)

| Feature | Description |
|---------|-------------|
| Flagging/Bookmark | UI buttons visible, no backend logic |
| AI Summarize/Q&A | UI placeholders only |
| Cross-document Tracking | Visual indicators only |
| Notes/Annotations | UI elements without persistence |

### 2.4 Out of Scope

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
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????                    LANDING PAGE                                     ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???? ?? [US Market] [KR Market]                                       ?? ???? ??                                                               ?? ???? ?? Company: Applied Materials, Inc. (AMAT)  |  $268.00          ?? ???? ?? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???? ?? GAAP/IFRS Income Statement                                   ?? ???? ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�??       ?? ???? ?? ??             ??FY15   ??FY16   ??FY17   ??FY25   ??       ?? ???? ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�??       ?? ???? ?? ??Sales        ??[9,659]??10,825]??14,537]??       ????Click?? ???? ?? ??COGS         ?? 6,706 ?? 6,202 ?? 8,020 ??       ??       ?? ???? ?? ??Gross Income ?? 2,953 ?? 4,623 ?? 6,517 ??       ??       ?? ???? ?? ??Net Income   ?? 1,377 ?? 1,721 ?? 3,434 ??       ??       ?? ???? ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?��??�?�?�?�?�?�?�??       ?? ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??                              ??                              ??Click number cell
                              ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????                  DOCUMENT VIEWER POPUP                              ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???? ?? FACTSET | Document Viewer                              [X]   ?? ???? ?? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???? ?? Entity: APPLIED MATERIALS INC /DE                            ?? ???? ?? Filing Type: 10-K  |  End Date: 2017-10-29                  ?? ???? ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ?? ???? ?? ??[Navigation]   ?? [Document Content]                    ?? ?? ???? ?? ??               ??                                       ?? ?? ???? ?? ??Cover          ?? Consolidated Balance Sheets           ?? ?? ???? ?? ??Document Info  ?? (USD $) In Millions                  ?? ?? ???? ?? ??               ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ?? ?? ???? ?? ??Financial      ?? ??             ??Oct 2017?�Oct 2016?? ?? ?? ???? ?? ??Statements     ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?? ?? ?? ???? ?? ?? ??Income      ?? ??Cash & equiv ??[5,010] ?? 3,406 ?? ?? ?? ???? ?? ?? ??Balance ??  ?? ??Short-term   ?? 2,266  ??  343  ?? ?? ?? ???? ?? ?? ??Cash Flow   ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ?? ?? ???? ?? ??               ??        ??                             ?? ?? ???? ?? ??Notes          ??   Highlighted cell                    ?? ?? ???? ?? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ?? ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??```

---

## 4. Footnote, Reference & Appendix Popup System (Detailed Specification)

### 4.1 Problem Statement

Financial documents (10-K filings, audit reports) heavily rely on footnotes, references, and appendices to provide critical context. The traditional reading experience forces users to:
- Scroll away from their current reading position
- Lose context while navigating to footnotes at page bottom
- Jump between sections for cross-references (e.g., "See Note 12 to Financial Statements")
- Manually track where they were reading before the interruption

**This creates significant friction for auditors, analysts, and researchers** who need to verify source material while maintaining reading flow.

### 4.2 Solution: Inline Contextual Popups

Implement a smart popup system that displays footnote, reference, and appendix content **inline** without disrupting the user's reading position. Inspired by:
- **Google Scholar PDF Reader** (2024): Inline citation previews
- **Papers ePDF Reader**: Hover-over citation information
- **Semantic Reader Project**: AI-augmented reading interfaces
- **Tufte CSS Sidenotes**: Marginal note paradigm

### 4.3 Reference Types in Financial Documents

| Type | Marker Example | Content Location | Popup Behavior |
|------|----------------|------------------|----------------|
| **Footnote** | ¹, ², ³, *, ??| Bottom of same page | Instant hover popup |
| **Endnote** | [1], [2], (1) | End of document section | Click to preview |
| **Cross-Reference** | "See Note 12" | Different section | Preview + navigate option |
| **Appendix Reference** | "Appendix A" | End of document | Preview first paragraph + expand |
| **Accounting Standard** | "ASC 606" | External reference | Definition popup |

### 4.4 User Interaction Patterns

#### 4.4.1 Footnote Hover Flow
```
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�???? Document Content                                                    ???? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�  ????                                                                     ???? Revenue recognition follows ASC 606¹ guidelines for contracts...    ????                              ??                                     ????                              ??Hover (300ms delay)                  ????                              ??                                     ????                   ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??                 ????                   ??¹ ASC 606 - Revenue from     ??                 ????                   ??Contracts with Customers,    ??                 ????                   ??effective for fiscal years   ??                 ????                   ??beginning after Dec 15, 2017 ??                 ????                   ??                             ??                 ????                   ??[Pin] [Go to Note] [Copy]    ??                 ????                   ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??                 ????                                                                     ???? The Company applies the five-step model...                         ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??```

#### 4.4.2 Cross-Reference Preview Flow
```
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�???? Financial Statements Section                                        ???? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�  ????                                                                     ???? Cash and cash equivalents (See Note 4) increased by $1,604M...     ????                             ??                                      ????                             ??Click                                 ????                             ??                                      ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??   ???? ???�� Note 4: Cash and Cash Equivalents                        ??   ???? ???�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?� ??   ???? ??                                                             ??   ???? ??The Company considers all highly liquid investments with    ??   ???? ??original maturities of three months or less at the date of ??   ???? ??purchase to be cash equivalents. Cash equivalents consist  ??   ???? ??primarily of money market funds and time deposits.          ??   ???? ??                                                             ??   ???? ??As of October 29, 2017, cash and cash equivalents totaled  ??   ???? ??$5,010 million, of which $4,212 million was held by        ??   ???? ??foreign subsidiaries.                                       ??   ???? ??                                                             ??   ???? ??[?�� Pin Popup] [?�️ Navigate to Full Note] [?�� Copy]         ??   ???? ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??   ????                                                                     ???? The increase was primarily due to strong operating cash flow...    ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??```

#### 4.4.3 Pinned Sidenote Mode
```
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�???? Document Content                          ?? Pinned Reference      ???? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�  ?? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�    ????                                           ??                       ???? Revenue recognition follows ASC 606¹     ?? ?�� Note 4: Cash       ???? guidelines. The Company applies the       ??                       ???? five-step model to determine when         ?? Cash equivalents      ???? revenue should be recognized:             ?? consist primarily     ????                                           ?? of money market       ???? 1. Identify the contract                  ?? funds and time        ???? 2. Identify performance obligations       ?? deposits. As of       ???? 3. Determine transaction price            ?? Oct 29, 2017, total   ???? 4. Allocate transaction price             ?? was $5,010M.          ???? 5. Recognize revenue when satisfied       ??                       ????                                           ?? [Unpin] [Expand]      ???? See Note 4 for cash flow details...      ??                       ???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??```

### 4.5 Popup UI Components

#### 4.5.1 Standard Footnote Popup
```
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????????¹                                                    ?????????�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�  ????????Revenue from contracts with customers is recognized ????????when control of goods or services is transferred    ????????to the customer at an amount that reflects the     ????????consideration the Company expects to be entitled    ????????to receive.                                         ????????                                                    ?????????��??�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�???��??�?�?�?�?�??             ???????????�� Pin ????Go to Section ????Copy ??             ?????????��??�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�???��??�?�?�?�?�??             ???????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??
Width: 320-480px (responsive)
Max Height: 300px (scrollable if longer)
Position: Appear near trigger, smart edge detection
```

#### 4.5.2 Cross-Reference Preview Popup
```
?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?????????�� Note 12: Stockholders' Equity                    ?????????�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�  ????????                                                    ????????Common Stock                                        ????????The Company is authorized to issue 2,500,000,000   ????????shares of common stock. As of October 29, 2017,    ????????1,074,223,064 shares were issued and outstanding.  ????????                                                    ?????????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??  ??????????Preview showing 25% of full note content...  ??  ?????????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??  ????????                                                    ?????????��??�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???????????�� Pin ????Read Full Note????Open in New Tab ?? ?????????��??�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�???��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?? ???????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?????��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??
Width: 400-560px (wider for notes with tables)
Max Height: 400px
Expandable: Click to show full content
```

### 4.6 Technical Implementation

#### 4.6.1 Footnote Detection & Parsing

```typescript
// Types for footnote system
interface FootnoteReference {
  id: string;
  marker: string;           // "1", "2", "*", "??
  type: 'footnote' | 'endnote' | 'cross-reference' | 'appendix';
  sourcePosition: {
    page: number;
    paragraph: number;
    charOffset: number;
  };
  targetPosition: {
    page: number;
    section: string;
    anchor: string;
  };
  content: string;          // Footnote text content
  contentPreview: string;   // First 200 chars for quick preview
}

interface FootnotePopupState {
  isVisible: boolean;
  isPinned: boolean;
  position: { x: number; y: number };
  footnote: FootnoteReference | null;
  expandedView: boolean;
}
```

#### 4.6.2 Component Architecture

```
src/components/FootnoteSystem/
?��??� FootnoteProvider.tsx       # Context for footnote state management
?��??� FootnoteMarker.tsx         # Clickable/hoverable footnote indicator
?��??� FootnotePopup.tsx          # Main popup component
?��??� CrossReferenceLink.tsx     # "See Note X" link component
?��??� PinnedSidenote.tsx         # Pinned reference sidebar
?��??� FootnoteTooltip.tsx        # Quick hover tooltip
?��??� hooks/
    ?��??� useFootnoteDetection.ts    # Parse document for references
    ?��??� usePopupPosition.ts        # Smart positioning logic
    ?��??� useFootnoteNavigation.ts   # Navigate to full reference
```

#### 4.6.3 Smart Positioning Algorithm

```typescript
function calculatePopupPosition(
  triggerRect: DOMRect,
  popupSize: { width: number; height: number },
  viewport: { width: number; height: number }
): { x: number; y: number; placement: 'top' | 'bottom' | 'left' | 'right' } {
  
  const MARGIN = 16;
  const ARROW_OFFSET = 12;
  
  // Prefer bottom placement
  let placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  let x = triggerRect.left + (triggerRect.width / 2) - (popupSize.width / 2);
  let y = triggerRect.bottom + ARROW_OFFSET;
  
  // Check bottom overflow ??try top
  if (y + popupSize.height > viewport.height - MARGIN) {
    placement = 'top';
    y = triggerRect.top - popupSize.height - ARROW_OFFSET;
  }
  
  // Check top overflow ??try right
  if (y < MARGIN) {
    placement = 'right';
    x = triggerRect.right + ARROW_OFFSET;
    y = triggerRect.top;
  }
  
  // Horizontal bounds checking
  x = Math.max(MARGIN, Math.min(x, viewport.width - popupSize.width - MARGIN));
  
  return { x, y, placement };
}
```

### 4.7 Footnote Mapping Data Structure

For the POC, footnote mappings will be pre-defined in JSON:

```json
{
  "document": "AMAT_10K_2017.pdf",
  "footnotes": [
    {
      "id": "fn-1",
      "marker": "1",
      "type": "footnote",
      "page": 45,
      "triggerText": "ASC 606¹",
      "content": "ASC 606 - Revenue from Contracts with Customers, effective for fiscal years beginning after December 15, 2017. The Company adopted this standard using the modified retrospective approach.",
      "targetSection": null
    },
    {
      "id": "note-4-ref",
      "marker": "Note 4",
      "type": "cross-reference",
      "page": 45,
      "triggerText": "See Note 4",
      "contentPreview": "Cash and cash equivalents consist primarily of money market funds and time deposits...",
      "content": "Note 4: Cash and Cash Equivalents\n\nThe Company considers all highly liquid investments with original maturities of three months or less...",
      "targetSection": "notes-to-financial-statements",
      "targetPage": 67
    },
    {
      "id": "appendix-a-ref",
      "marker": "Appendix A",
      "type": "appendix",
      "page": 12,
      "triggerText": "See Appendix A",
      "contentPreview": "Risk Factor Details: The following provides additional detail on material risks...",
      "targetSection": "appendix-a-risk-factors",
      "targetPage": 120
    }
  ],
  "koreanFootnotes": [
    {
      "id": "주석-4",
      "marker": "주석 4",
      "type": "cross-reference",
      "page": 12,
      "triggerText": "주석 4,26,33",
      "contentPreview": "매출???�식 기�?: ?�사??고객과의 계약?�서 ?�기???�익 기�???..",
      "content": "주석 4: 매출??n\n?�사???�국채택�?��?�계기�? ??115?�에 ?�라 매출?�을 ?�식?�니??..",
      "targetSection": "주석",
      "targetPage": 45
    }
  ]
}
```

### 4.8 Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard Navigation | Tab to footnote marker, Enter to open popup, Escape to close |
| Screen Reader | ARIA labels: `aria-describedby`, `role="tooltip"` |
| Focus Management | Focus trapped in popup when open, return to trigger on close |
| Color Contrast | WCAG AA compliant (4.5:1 ratio minimum) |
| Reduced Motion | Respect `prefers-reduced-motion` for animations |

### 4.9 Performance Considerations

| Aspect | Target | Implementation |
|--------|--------|----------------|
| Popup Render | < 50ms | Pre-render popup content, lazy load full note |
| Hover Delay | 300ms | Prevent accidental triggers, cancel on mouse leave |
| Content Fetch | < 200ms | Cache footnote content in memory |
| Pin State | Instant | Local state management, no server round-trip |

### 4.10 Korean Document Support (SK Hynix)

Korean financial documents have specific annotation patterns:

| Korean Term | English Equivalent | Handling |
|-------------|-------------------|----------|
| 주석 | Notes | Cross-reference popup |
| 각주 | Footnote | Inline popup |
| 부�?| Appendix | Section preview |
| 참조 | Reference | Link with preview |

---

## 5. AI Question-Answering System (NotebookLLM-Inspired)

### 5.1 Problem Statement & Market Context

Financial analysts, auditors, and researchers face significant challenges when working with financial documents:

**Industry Pain Points (Based on Research):**

| Sector | Key Pain Points | Current Tools | Gaps |
|--------|-----------------|---------------|------|
| **Law Firms** | Document review time, AI hallucination risk (17-33% per Stanford), legal research accuracy | ChatGPT, Claude, Spellbook, CaseText CoCounsel | Lack of source grounding, citation verification |
| **Big 4 Audit Firms** | Manual 10-K review, risk assessment, anomaly detection across filings | Deloitte Zora/DARTbot, EY Helix GLAD, KPMG Clara, PwC Omnia | Cross-document comparison, footnote context |
| **Consulting Firms** | Knowledge retrieval from vast document repositories, expert synthesis | McKinsey Lilli (70% adoption, 30% time savings), BCG GENE (18,000+ GPTs) | Domain-specific financial Q&A |
| **Financial Analysts** | Year-over-year comparison, footnote tracking, regulatory change tracking | Search10K, V7 Labs 10-K Analyzer (95% faster) | Real-time Q&A within document context |

### 5.2 Solution: Integrated AI Q&A with Document Context

Implement an AI-powered question-answering system inspired by **Google NotebookLLM** that enables users to:
1. Ask questions about uploaded financial documents
2. Get source-grounded answers with citations
3. Expand research beyond attached documents to external sources
4. Query within footnote popups for instant context

**Key NotebookLLM Features to Emulate:**
- Multimodal source uploads (PDF, documents, web content)
- Personalized AI expertise based on uploaded content
- Citation-grounded responses (no hallucinations)
- Cross-document synthesis and comparison
- Audio overview generation (future phase)

### 5.3 AI Q&A Feature Scope

#### 5.3.1 POC Scope (P0)

| Feature | Priority | Description |
|---------|----------|-------------|
| **Document Q&A** | P0 | Ask questions about uploaded 10-K/financial statements |
| **Source Citations** | P0 | Every answer includes page/section references |
| **Footnote AI Query** | P0 | Ask AI within footnote popup (QT-69 requirement) |
| **Context Awareness** | P0 | AI understands current document context and user position |

#### 5.3.2 Phase 2 Scope (P1)

| Feature | Priority | Description |
|---------|----------|-------------|
| **Cross-Document Q&A** | P1 | Compare across multiple filings (YoY analysis) |
| **External Research** | P1 | Expand search to SEC database, DART, external sources |
| **Summarization** | P1 | AI-generated summaries of sections, notes, risk factors |
| **Prior Year Context** | P1 | Auto-retrieve related footnotes from prior year filings |

#### 5.3.3 Future Phases (Post-POC)

| Feature | Description |
|---------|-------------|
| Audio Overviews | NotebookLLM-style podcast generation for documents |
| Multi-Agent Analysis | LiveAI-style specialized agents for different analysis types |
| Anomaly Detection | Flag unusual changes in financial statements |
| Regulatory Tracking | Track accounting standard changes (ASC updates) |

### 5.4 QT-69 Korean Footnote AI Q&A (Detailed Specification)

**Reference:** [QT-69: 재무제표 주석 번호 인라인 팝업 및 AI 질의 기능](https://linear.app/betalgeuse/issue/QT-69)

#### 5.4.1 Problem (Korean Financial Statements)

In Korean 사업보고서/분기보고서 documents:
- Footnote markers like `(주5, 6)` appear in financial statement text
- Actual footnote content is **pages away** from the marker
- Users must manually navigate through dozens of pages to find 주석 content
- No way to quickly compare current footnote with prior year equivalent

**Example from SK Hynix 분기보고서:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 연결재무제표                                                    │
├─────────────────────────────────────────────────────────────────┤
│ 과목          │ 주석    │ 당기(2024) │ 전기(2023) │            │
├───────────────┼─────────┼────────────┼────────────┤            │
│ Ⅰ. 매출액    │ (주5,6) │ 44,621,568 │ 42,997,792 │ ← 클릭 시  │
│ Ⅱ. 매출원가  │ (주28)  │ 28,993,713 │ 24,045,600 │   주석 팝업│
└─────────────────────────────────────────────────────────────────┘
        │
        │ 마우스 호버/클릭
        ▼
┌─────────────────────────────────────────────────────────────────┐
│ 📄 주석 5: 매출액                                               │
├─────────────────────────────────────────────────────────────────┤
│ 회사는 한국채택국제회계기준 제1115호에 따라 매출액을           │
│ 인식합니다. 고객과의 계약에서 발생하는 수익은...               │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🤖 AI에게 질문하기                                          │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ 💬 "이 주석 요약해줘"                                       │ │
│ │ 💬 "작년 동일 주석 수치는?"                                  │ │
│ │ 💬 "연결/별도 재무제표 비교"                                 │ │
│ │ [질문 입력...]                              [전송]          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [📌 고정] [📄 전체 보기] [📋 복사]                              │
└─────────────────────────────────────────────────────────────────┘
```

#### 5.4.2 Korean Footnote Recognition Patterns

```typescript
// QT-69: Auto-detect Korean footnote markers
const koreanFootnotePatterns = [
  /\(주\s*(\d+(?:,\s*\d+)*)\)/g,           // (주5, 6), (주 5, 6)
  /\(주석\s*(\d+(?:,\s*\d+)*)\)/g,         // (주석5), (주석 5, 6)
  /주석\s*(\d+)/g,                          // 주석 5 (without parentheses)
  /각주\s*(\d+)/g,                          // 각주 1
  /\*{1,3}/g,                               // *, **, ***
  /†|‡|§/g,                                 // †, ‡, §
  /\(\d+\)/g,                               // (1), (2)
];

interface KoreanFootnoteReference {
  id: string;
  marker: string;              // "(주5, 6)"
  noteNumbers: number[];       // [5, 6]
  type: '주석' | '각주' | '부록' | '참조';
  sourcePosition: {
    page: number;
    tableRow?: number;
    column?: string;
  };
  matchedContent: {
    noteNumber: number;
    title: string;
    content: string;
    targetPage: number;
  }[];
}
```

#### 5.4.3 AI Query Integration in Footnote Popup

```typescript
// AI Q&A Component within FootnotePopup
interface FootnoteAIQuery {
  footnoteId: string;
  query: string;
  context: {
    currentDocument: string;
    currentFootnote: string;
    relatedFootnotes?: string[];      // Same footnote from prior years
    crossDocuments?: string[];        // Consolidated vs. separate statements
  };
}

// Pre-built query suggestions for QT-69
const koreanQuerySuggestions = [
  { label: "이 주석 요약", query: "이 주석의 핵심 내용을 3줄로 요약해줘" },
  { label: "작년 동일 수치", query: "전년도 동일 주석의 관련 수치는 얼마였는지?" },
  { label: "연결/별도 비교", query: "연결재무제표와 별도재무제표의 해당 항목 차이점은?" },
  { label: "변동 사항", query: "전기 대비 당기의 주요 변동 사항은?" },
  { label: "회계정책 설명", query: "적용된 회계정책을 쉽게 설명해줘" },
];

const englishQuerySuggestions = [
  { label: "Summarize", query: "Summarize this footnote in 3 bullet points" },
  { label: "Prior Year", query: "What was the same figure in the prior year filing?" },
  { label: "Compare Periods", query: "Compare this quarter to the same quarter last year" },
  { label: "Risk Factors", query: "What risks are mentioned in relation to this item?" },
  { label: "Accounting Policy", query: "Explain the accounting policy applied here" },
];
```

### 5.5 RAG Architecture for Financial Document Q&A

Based on extensive research on RAG best practices for financial documents:

#### 5.5.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    RAG Architecture for Financial Q&A                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────────────┐   │
│  │ Document      │    │ Metadata      │    │ Vector Store          │   │
│  │ Ingestion     │───▶│ Extraction    │───▶│ (Embeddings)          │   │
│  │ - PDF Parse   │    │ - Fiscal Year │    │ - Contextual Chunks   │   │
│  │ - XBRL Parse  │    │ - Section ID  │    │ - Metadata-enriched   │   │
│  │ - Table OCR   │    │ - Doc Type    │    │                       │   │
│  └───────────────┘    └───────────────┘    └───────────┬───────────┘   │
│                                                         │               │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        Query Processing                           │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │  User Query ──▶ Pre-Filter ──▶ Semantic Search ──▶ Reranker     │ │
│  │      │          (metadata)      (vector)           (relevance)   │ │
│  │      │              │               │                  │         │ │
│  │      ▼              ▼               ▼                  ▼         │ │
│  │  "What was    Filter to       Find similar      Rank by         │ │
│  │   revenue     FY2024          chunks            context fit     │ │
│  │   in 2024?"   10-K docs                                         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                         │               │
│                                                         ▼               │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                     Response Generation                           │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │  Retrieved Context + Query ──▶ LLM ──▶ Grounded Answer           │ │
│  │                                  │                                │ │
│  │  "Revenue in FY2024 was $27.2B   ▼                               │ │
│  │   [Source: 10-K p.45, Note 4]"   Citations auto-attached         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 5.5.2 Key RAG Components

| Component | Implementation | Rationale |
|-----------|----------------|-----------|
| **Contextual Chunking** | Chunks include section headers + metadata | Critical for sparse financial data (per arxiv:2510.24402) |
| **Metadata Tagging** | Fiscal year, company, section, table/text type | Pre-retrieval filtering improves precision |
| **Domain Embeddings** | Financial-domain fine-tuned embeddings | Better semantic understanding of financial terms |
| **Reranker** | Post-retrieval relevance scoring | Substantial performance improvement per FinanceBench |
| **Citation Grounding** | Every response includes source page/section | Prevents hallucination, enables verification |

#### 5.5.3 Document Processing Pipeline

```typescript
interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    documentId: string;
    documentType: '10-K' | '10-Q' | '8-K' | '사업보고서' | '분기보고서';
    company: string;
    fiscalYear: number;
    fiscalQuarter?: number;
    section: string;           // "MD&A", "Risk Factors", "Notes", "주석"
    sectionNumber?: string;    // "Note 4", "주석 5"
    pageNumber: number;
    contentType: 'text' | 'table' | 'footnote';
    language: 'en' | 'ko';
  };
  embedding?: number[];        // Vector embedding
}

interface RAGQuery {
  query: string;
  filters?: {
    company?: string;
    fiscalYear?: number;
    documentType?: string;
    section?: string;
    language?: 'en' | 'ko';
  };
  context?: {
    currentPage?: number;
    currentSection?: string;
    selectedFootnote?: string;
  };
  options?: {
    includePriorYear?: boolean;      // For YoY comparison
    includeExternalSources?: boolean; // Expand beyond uploaded docs
    maxResults?: number;
  };
}

interface RAGResponse {
  answer: string;
  citations: {
    documentId: string;
    page: number;
    section: string;
    excerpt: string;
    confidence: number;
  }[];
  relatedContent?: {
    priorYearFootnote?: string;
    relatedNotes?: string[];
  };
}
```

### 5.6 Cross-Document Research Capability

#### 5.6.1 Year-over-Year Analysis

```
┌─────────────────────────────────────────────────────────────────────┐
│  Cross-Document Query: "Compare Note 4 Cash position YoY"          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────┐    ┌─────────────────────┐                │
│  │ AMAT 10-K FY2024    │    │ AMAT 10-K FY2023    │                │
│  │ ─────────────────── │    │ ─────────────────── │                │
│  │ Note 4: Cash        │    │ Note 4: Cash        │                │
│  │ $5,200M             │◀──▶│ $5,010M             │                │
│  │ Page 67             │    │ Page 65             │                │
│  └─────────────────────┘    └─────────────────────┘                │
│                                                                     │
│  AI Response:                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ Cash and cash equivalents increased by $190M (3.8%) from       ││
│  │ FY2023 to FY2024.                                               ││
│  │                                                                 ││
│  │ Key changes:                                                    ││
│  │ • Operating cash flow: +$1.2B                                  ││
│  │ • Capex investment: -$800M                                     ││
│  │ • Dividend payments: -$210M                                    ││
│  │                                                                 ││
│  │ [📄 FY2024 Note 4, p.67] [📄 FY2023 Note 4, p.65]             ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

#### 5.6.2 External Source Integration (P1)

| Source | Integration Method | Use Case |
|--------|-------------------|----------|
| **SEC EDGAR** | API for 10-K/10-Q filings | Expand to peer company comparisons |
| **Korean DART** | DART API for 사업보고서 | Korean regulatory filings |
| **Accounting Standards** | ASC/IFRS reference database | Explain accounting policy references |
| **News/Press Releases** | News API integration | Context on material events |

### 5.7 UI Components for AI Q&A

#### 5.7.1 Document-Level AI Assistant

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FACTSET | Document Viewer                              [🤖 AI] [X]     │
├─────────────────────────────────────────────────────────────────────────┤
│ Entity: APPLIED MATERIALS INC /DE                                       │
│ Filing Type: 10-K  |  End Date: 2024-10-27                             │
├───────────────┬─────────────────────────────────────────────────────────┤
│ [Navigation]  │ [Document Content]                     [AI Panel]      │
│               │                                        ┌──────────────┐│
│ Cover         │ Note 4: Cash and Cash Equivalents     │🤖 AI Q&A     ││
│ Document Info │                                        │              ││
│               │ The Company considers all highly      │Ask about     ││
│ Financial     │ liquid investments with original      │this document ││
│ Statements    │ maturities of three months or less... │              ││
│  ▸ Income     │                                        │[💬 입력...] ││
│  ▸ Balance    │ As of October 27, 2024, cash and      │              ││
│  ▸ Cash Flow  │ cash equivalents totaled $5,200M,     │Recent:       ││
│               │ of which $4,400M was held by          │• "Summarize" ││
│ Notes         │ foreign subsidiaries.                 │• "YoY change"││
│  ▸ Note 4 ◀   │                                        │• "Risks?"   ││
│  ▸ Note 5     │                                        │              ││
└───────────────┴─────────────────────────────────────────┴──────────────┘│
```

#### 5.7.2 Footnote Popup AI Integration (QT-69)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  📄 주석 5: 매출액                                                [X] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  회사는 한국채택국제회계기준 제1115호에 따라 고객과의 계약에서         │
│  발생하는 수익을 인식합니다. 수익은 고객에게 약속한 재화나 용역을      │
│  이전하여 수행의무를 이행할 때 인식합니다.                             │
│                                                                         │
│  당기 매출액: ₩44,621,568백만원                                        │
│  전기 매출액: ₩42,997,792백만원                                        │
│  증감: +₩1,623,776백만원 (+3.8%)                                       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  🤖 AI 질문하기                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [이 주석 요약] [전년 비교] [회계정책 설명] [연결/별도 비교]    │   │
│  │                                                                 │   │
│  │ [질문을 입력하세요...]                            [전송 ▶]    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  [📌 고정] [📄 전체 주석 보기] [📋 복사]                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.8 Technical Implementation

#### 5.8.1 Component Architecture

```
src/components/AISystem/
├── AIProvider.tsx              # Context for AI state management
├── AIPanel.tsx                 # Side panel for document-level Q&A
├── AIQueryInput.tsx            # Query input with suggestions
├── AIResponse.tsx              # Response display with citations
├── CitationLink.tsx            # Clickable citation references
├── QuerySuggestions.tsx        # Pre-built query buttons
├── FootnoteAIQuery.tsx         # AI Q&A within footnote popup (QT-69)
├── CrossDocumentQuery.tsx      # YoY comparison queries
└── hooks/
    ├── useRAGQuery.ts          # RAG query execution
    ├── useDocumentContext.ts   # Current document/position context
    ├── useCitationNavigation.ts # Navigate to cited sections
    └── useQueryHistory.ts      # Track user's Q&A history
```

#### 5.8.2 API Integration Points

```typescript
// AI Q&A API endpoints (future backend)
interface AIAPIEndpoints {
  // Document Q&A
  queryDocument: '/api/ai/query';           // POST: RAG query
  getQuerySuggestions: '/api/ai/suggestions'; // GET: Context-aware suggestions
  
  // Cross-document
  compareDocuments: '/api/ai/compare';      // POST: YoY/peer comparison
  
  // External research (P1)
  searchExternal: '/api/ai/external';       // POST: SEC/DART search
  
  // Streaming response
  streamResponse: '/api/ai/stream';         // WebSocket: Real-time response
}

// POC: Mock AI responses for demonstration
const mockAIResponses: Record<string, RAGResponse> = {
  "summarize-note-4": {
    answer: "Note 4 covers cash and cash equivalents...",
    citations: [{ documentId: "AMAT_10K_2024", page: 67, section: "Note 4", excerpt: "...", confidence: 0.95 }]
  },
  // Additional mock responses for demo
};
```

### 5.9 Performance & Quality Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Query Response Time | < 2s (simple), < 5s (cross-doc) | Time to first response token |
| Citation Accuracy | > 95% | Cited sections contain relevant info |
| Hallucination Rate | < 5% | Claims without source support |
| User Satisfaction | > 4.0/5.0 | Post-query feedback rating |
| Korean Query Support | 100% parity | Same features for EN/KO |

### 5.10 Security & Privacy Considerations

| Concern | Mitigation |
|---------|------------|
| Document Confidentiality | All processing in secure environment; no data retention post-session |
| LLM Data Privacy | Use enterprise LLM endpoints (Azure OpenAI, Bedrock) with data protection |
| Citation Verification | Every claim linked to source; users can verify |
| Audit Trail | Log all queries for compliance (optional) |

---

## 6. Data Specifications

### 6.1 US Market (AMAT)

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

### 6.2 KR Market (SK Hynix)

**Company:** SK Hynix Inc.  
**Document:** ?�결감사보고??(Consolidated Audit Report)

**?�결?�괄?�익계산??(Consolidated Statement of Comprehensive Income):**

| 과목 | 주석 | ??5�?(2022) | ??4�?(2021) |
|------|------|---------------|---------------|
| ?? 매출??| 4,26,33 | 44,621,568 | **42,997,792** |
| ?? 매출?��? | 28,33 | 28,993,713 | 24,045,600 |
| ?? 매출총이??| | 15,627,855 | 18,952,192 |

**Document Viewer Highlight:**
- 매출??**42,997,792** (백만?? ??4�?

---

## 7. Technical Architecture

### 7.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14+ (App Router) | Rapid prototyping, SSR support |
| UI Framework | Tailwind CSS | Fast styling, responsive design |
| PDF Rendering | iframe / react-pdf | Simple integration, smooth scroll |
| State Management | React useState/Context | Lightweight, POC-appropriate |
| Language | TypeScript | Type safety, better DX |

### 7.2 Component Structure

```
src/
?��??� app/
??  ?��??� layout.tsx
??  ?��??� page.tsx              # Landing page
??  ?��??� globals.css
?��??� components/
??  ?��??� LandingPage/
??  ??  ?��??� FinancialTable.tsx
??  ??  ?��??� MarketTabs.tsx
??  ??  ?��??� ClickableCell.tsx
??  ?��??� DocumentViewer/
??  ??  ?��??� ViewerModal.tsx
??  ??  ?��??� Navigation.tsx
??  ??  ?��??� DocumentContent.tsx
??  ??  ?��??� HighlightOverlay.tsx
??  ?��??� FootnoteSystem/           # NEW: Footnote/Reference Popup System
??  ??  ?��??� FootnoteProvider.tsx      # Context for state management
??  ??  ?��??� FootnoteMarker.tsx        # Clickable/hoverable indicator (¹, ², *)
??  ??  ?��??� FootnotePopup.tsx         # Main popup component
??  ??  ?��??� CrossReferenceLink.tsx    # "See Note X" link with preview
??  ??  ?��??� AppendixPreview.tsx       # Appendix section quick view
??  ??  ?��??� PinnedSidenote.tsx        # Pinned reference sidebar panel
??  ??  ?��??� FootnoteTooltip.tsx       # Quick hover tooltip
??  ?��??� common/
??      ?��??� Modal.tsx
??      ?��??� Popup.tsx                 # Reusable popup base component
??      ?��??� Button.tsx
?��??� data/
??  ?��??� amat-financials.json
??  ?��??� skhynix-financials.json
??  ?��??� document-mapping.json
??  ?��??� footnote-mapping.json         # NEW: Footnote/reference definitions
?��??� hooks/
??  ?��??� useDocumentViewer.ts
??  ?��??� useFootnoteDetection.ts       # NEW: Parse doc for references
??  ?��??� usePopupPosition.ts           # NEW: Smart edge-aware positioning
??  ?��??� useFootnoteNavigation.ts      # NEW: Navigate to full reference
?��??� types/
    ?��??� index.ts
    ?��??� footnotes.ts                  # NEW: Footnote type definitions
```

### 7.3 Data Flow

```
?��??�?�?�?�?�?�?�?�?�?�?�?�??   Click Cell    ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????Landing     ???�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????Document Viewer  ????Page        ??                 ??Modal            ???��??�?�?�?�?�?�?�?�?�?�?�?�??                 ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??      ??                                  ??      ??                                  ??      ??                                  ???��??�?�?�?�?�?�?�?�?�?�?�?�??                 ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�????Financial   ??                 ??PDF Iframe/      ????Data JSON   ??                 ??React-PDF        ???��??�?�?�?�?�?�?�?�?�?�?�?�??                 ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??      ??                                  ??      ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??                      ??                      ??              ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??              ??Document Mapping ??              ??(cell ??section) ??              ?��??�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�??```

---

## 8. UI/UX Specifications

### 8.1 Landing Page Table

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

### 8.2 Document Viewer Modal

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

### 8.3 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Full layout with sidebar |
| Tablet (768-1024px) | Collapsible sidebar |
| Mobile (<768px) | Full-screen modal, hidden sidebar |

---

## 9. Interaction Specifications

### 9.1 Cell Click Flow

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

### 9.2 Close Behaviors

| Trigger | Action |
|---------|--------|
| X Button | Close modal |
| ESC Key | Close modal |
| Outside Click | Close modal (optional) |
| Back Button | Close modal |

---

## 10. Assets Required

### 10.1 PDF Documents

| Document | Market | Status | Location |
|----------|--------|--------|----------|
| AMAT 10-K | US | ??Available | `assets/pdfs/AMAT_10K.pdf` |
| SK Hynix 감사보고??| KR | ??Available | `assets/pdfs/SK_Hynix_10K.pdf` |

### 10.2 Screen Recordings (Reference)

| Recording | Purpose | Status | Location |
|-----------|---------|--------|----------|
| factset audit_amat_us.mp4 | US market flow demo | ??Available | `assets/recordings/` |
| factset audit_sk hynix_korea.mp4 | KR market flow demo | ??Available | `assets/recordings/` |

---

## 11. Success Criteria

### 11.1 Functional Requirements

**Core Document Viewer:**
- [ ] User can view financial data table on landing page
- [ ] User can switch between US and KR market views
- [ ] User can click any numeric cell to open Document Viewer
- [ ] Document Viewer displays correct source PDF
- [ ] Document auto-scrolls to relevant section
- [ ] Relevant data is highlighted in document
- [ ] User can navigate document via sidebar TOC
- [ ] User can close modal via X, ESC, or outside click

**Footnote/Reference Popup System (Core Differentiator):**
- [ ] Hovering over footnote marker (¹, ², *) shows inline popup
- [ ] Popup appears within 300ms of hover, near the trigger element
- [ ] Popup displays full footnote content without scrolling away
- [ ] Clicking "See Note X" shows preview of that note section
- [ ] User can pin popup to keep it visible while reading
- [ ] Pinned references appear in side panel (Tufte-style sidenotes)
- [ ] User can navigate to full note from popup
- [ ] Popup closes on ESC, outside click, or explicit close button
- [ ] Multiple footnotes can be viewed sequentially without losing place
- [ ] Korean documents (주석, 각주) work identically to English

**AI Q&A System (QT-69):**
- [ ] User can ask questions about the current document
- [ ] AI responses include source citations (page, section)
- [ ] AI Q&A available within footnote popup
- [ ] Pre-built query suggestions displayed (EN/KO)
- [ ] Korean footnote markers auto-detected: (주5, 6), (주석5), etc.
- [ ] Response time < 2s for simple queries
- [ ] Citations are clickable and navigate to source

### 11.2 Performance Targets

| Metric | Target |
|--------|--------|
| Initial Page Load | < 2s |
| Modal Open Animation | < 300ms |
| PDF Load Time | < 1.5s |
| Scroll to Section | < 500ms |
| Footnote Popup Render | < 50ms |
| Hover-to-Popup Delay | 300ms (intentional) |
| Cross-Reference Preview Load | < 200ms |
| Pin/Unpin Action | Instant (< 16ms) |
| AI Query Response | < 2s (simple), < 5s (cross-doc) |
| AI Citation Accuracy | > 95% |
| AI Hallucination Rate | < 5% |

---

## 12. Future Roadmap (Post-POC)

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

## 13. Appendix

### A. Related Linear Issues

| Issue | Title | Status |
|-------|-------|--------|
| [QT-46](https://linear.app/betalgeuse/issue/QT-46) | Factset 목업 화면 전화용 PDF 자료 요청 | In Progress |
| [QT-65](https://linear.app/betalgeuse/issue/QT-65) | Create new PRD for Factset audit POC | In Progress |
| [QT-69](https://linear.app/betalgeuse/issue/QT-69) | 재무제표 주석 번호 인라인 팝업 및 AI 질의 기능 | In Progress |

### B. Reference Materials

- AMAT 10-K (FY2017): Consolidated Balance Sheets
- SK Hynix ?�결감사보고?? ?�결?�괄?�익계산??- Factset Document Viewer UI mockups (Linear attachments)
- Screen recording demos (Linear attachments)

### C. Industry Best Practices Applied

1. **Source Provenance Tracking**: Every displayed number links to its original document location
2. **Audit Trail Support**: Clear visual connection between data and source
3. **Cross-Document Navigation**: TOC sidebar for efficient document exploration
4. **Responsive Design**: Works across desktop and mobile devices
5. **Performance Optimization**: Lazy loading for PDF content

### D. Footnote/Reference Popup Research Sources

The inline footnote popup system is based on extensive research from:

**Academic Paper Readers:**
- **Google Scholar PDF Reader (2024)**: Inline citation previews, clickable references that show previews without losing reading position
- **Papers ePDF Reader**: Hover-over citation information, informational panels for figures and references
- **Semantic Reader Project**: AI-augmented reading interfaces with dynamic popups
- **PubReader (NIH/NCBI)**: Multi-column layout with image strips and inline citation previews

**UX Research & Guidelines:**
- **Nielsen Norman Group**: Tooltips should provide supplementary information without blocking critical content
- **UXPlanet Tooltip Guidelines**: Clarity, consistency, timing, accessibility compliance
- **Tufte CSS Sidenotes**: Marginal notes paradigm for maintaining reading flow

**Implementation References:**
- **react-a11y-footnotes**: Accessible React component for footnote references
- **curvenote/sidenotes**: Floating sidenotes with inline references
- **Littlefoot.js**: Interactive footnote popups with elegant animations
- **rehype-sidenotes**: Transform footnotes to inline sidenotes

**Financial Document Standards:**
- **SEC Regulation S-K**: Cross-referencing requirements for 10-K filings
- **XBRL/Inline XBRL**: Tagged financial data for machine readability
- **FISD Audit Best Practices**: Market data audit workflow standards

### E. Competitive Analysis

| Feature | Factset Current | Bloomberg | Our POC |
|---------|-----------------|-----------|---------|
| Footnote Hover | X | X | O |
| Cross-Reference Preview | X | X | O |
| Pinned Sidenotes | X | X | O |
| Source Provenance | Partial | Partial | O Full |
| Multi-language (KR/EN) | O | O | O |
| AI Document Q&A | X | X | O |
| Citation-Grounded Responses | X | X | O |
| Cross-Document YoY Analysis | Partial | Partial | O (P1) |

### F. AI Q&A System Research Sources

**AI Document Q&A Platforms:**
- **Google NotebookLLM**: Multimodal source uploads (500k words/source), personalized AI expertise, audio overviews, citation-grounded responses, 80+ language support
- **McKinsey Lilli**: 100k+ document repository, 4M+ prompts, 70% employee adoption, 30% time savings on research tasks
- **BCG GENE**: GPT-4o based, 18,000+ custom GPTs, 20% of BCG revenue from AI services

**Big 4 Audit Firm AI Tools:**
- **Deloitte Zora AI**: Autonomous task execution, document uploads for tax returns, financial statement analysis
- **Deloitte DARTbot**: GPT-4 powered accounting standards Q&A, natural language queries
- **EY Helix GLAD**: General Ledger Anomaly Detection, supervised/unsupervised ML combination
- **EY Atlas AI**: Unstructured data analysis, $2.1B fraud identified through AI-driven audits
- **KPMG Clara**: GenAI integration for 90,000 auditors, AI-assisted risk assessments, voice-to-text, contract analyzer
- **PwC Omnia**: Real-time risk assessment, audit documentation enhancement

**RAG Architecture Research:**
- **arxiv:2510.24402 "Metadata-Driven RAG for Financial Q&A"**: Multi-stage architecture, contextual chunking, metadata-enriched embeddings, FinanceBench evaluation
- **arxiv:2504.14493 "FinSage: Multi-aspect RAG for Financial Filings"**: Heterogeneous data handling, domain-specific adaptation
- **Humanloop RAG Architectures Guide**: Simple RAG, RAG with Memory, production patterns
- **AWS RAG Guide**: Authoritative knowledge base integration, response validation

**Financial Document Analysis Tools:**
- **Search10K**: 5-second SEC filing queries, sentiment analysis, theme tracking
- **V7 Labs 10-K Analyzer**: 95% faster review (2-4 hours to 5 minutes), YoY change detection, MD&A summarization
- **LiveAI SEC Filings**: Multi-agent financial document analyzer, dynamic RAG pipeline
- **Captide Financial Filings API**: LLM-optimized document chunks, semantic search

**Korean Financial Data Systems:**
- **DART (Data Analysis, Retrieval, Transfer System)**: Korean electronic disclosure system, XBRL format support
- **Korean FSS XBRL Guide (2025)**: 재무제표 본문/주석 작성 가이드, enhanced annotation requirements
- **DART API**: Programmatic access to 사업보고서/분기보고서, XBRL data parsing

**Law Firm AI Adoption:**
- 54%+ of attorneys cite efficiency as key AI benefit (Thomson Reuters)
- AI hallucination rates 17-33% in legal contexts (Stanford study) - emphasis on citation grounding
- Tools: ChatGPT, Claude, Spellbook (contracts), CaseText CoCounsel (legal research)

### G. Glossary

| Term | Definition |
|------|------------|
| RAG | Retrieval-Augmented Generation - AI architecture combining search with LLM generation |
| Contextual Chunking | Document segmentation preserving section context and metadata |
| Citation Grounding | Linking AI responses to specific source locations |
| DART | Korean electronic disclosure system (Data Analysis, Retrieval, Transfer System) |
| XBRL | eXtensible Business Reporting Language for structured financial data |
| 주석/주석 | Korean for "footnote/note" in financial statements |
| 사업보고서 | Korean Annual Business Report |
| 분기보고서 | Korean Quarterly Report |

---

*Document maintained by: Development Team*  
*Last updated: 2025-12-08*
