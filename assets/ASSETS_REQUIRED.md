# Assets Required for Factset Audit POC

**Related Issues:** [QT-46](https://linear.app/betalgeuse/issue/QT-46), [QT-65](https://linear.app/betalgeuse/issue/QT-65)

---

## PDF Documents

### US Market (AMAT)

| Item | Description | Source | Status |
|------|-------------|--------|--------|
| AMAT 10-K | Applied Materials Annual Report | Linear QT-65 attachment | ⏳ Pending download |
| Target Section | Consolidated Balance Sheets | Page containing Cash & equiv $5,010M | - |

**Download URL:** Available in Linear QT-65 attachments

### KR Market (SK Hynix)

| Item | Description | Source | Status |
|------|-------------|--------|--------|
| SK Hynix 감사보고서 | SK Hynix Consolidated Audit Report | Linear QT-65 attachment | ⏳ Pending download |
| Target Section | 연결포괄손익계산서 | Page containing 매출액 42,997,792 | - |

**Download URL:** Available in Linear QT-65 attachments

---

## Screen Recordings (Reference)

These recordings demonstrate the expected user flow for the POC.

| File | Market | Description | Source |
|------|--------|-------------|--------|
| factset audit_amat_us.mp4 | US | AMAT document viewer flow | Linear QT-46 comments |
| factset audit_sk hynix_korea.mp4 | KR | SK Hynix document viewer flow | Linear QT-46 comments |

**Purpose:** 
- Reference for UI/UX implementation
- Demonstration of smooth PDF scroll behavior
- Example of highlight animations

---

## UI Mockup Images

Available in Linear QT-65 description:

1. **AMAT Income Statement Landing Page**
   - Shows Factset-style financial table
   - Clickable number cells
   - US market layout

2. **Document Viewer Popup (AMAT)**
   - Balance Sheet view
   - Navigation sidebar
   - Highlighted data row

3. **Document Viewer Popup (SK Hynix)**
   - 연결포괄손익계산서 view
   - Korean language layout
   - 매출액 highlight

---

## Asset Checklist

### Phase 1: Setup
- [ ] Download AMAT_10K.pdf to `assets/pdfs/`
- [ ] Download SK_Hynix_10K.pdf to `assets/pdfs/`
- [ ] Download reference recordings to `assets/recordings/`

### Phase 2: Implementation
- [ ] Extract specific pages for fast loading
- [ ] Identify page numbers for auto-scroll targets
- [ ] Create document mapping JSON (cell ID → page/section)

### Phase 3: Optimization
- [ ] Compress PDFs for web delivery
- [ ] Generate thumbnail previews
- [ ] Create fallback images for slow connections

---

## File Naming Convention

```
assets/
├── pdfs/
│   ├── AMAT_10K.pdf
│   ├── AMAT_10K_balance_sheet.pdf  (extracted section)
│   ├── SK_Hynix_10K.pdf
│   └── SK_Hynix_10K_income.pdf     (extracted section)
├── recordings/
│   ├── factset_audit_amat_us.mp4
│   └── factset_audit_sk_hynix_kr.mp4
└── ASSETS_REQUIRED.md
```

---

## Data Mapping Structure

For the POC, we need a mapping between clickable cells and document locations:

```json
{
  "mappings": [
    {
      "cellId": "AMAT-FY17-CashEquiv",
      "value": 5010,
      "document": "AMAT_10K.pdf",
      "page": 45,
      "section": "Consolidated Balance Sheets",
      "anchor": "#cash-equivalents-2017"
    },
    {
      "cellId": "SKHYNIX-FY74-Revenue",
      "value": 42997792,
      "document": "SK_Hynix_10K.pdf",
      "page": 12,
      "section": "연결포괄손익계산서",
      "anchor": "#revenue-fy74"
    }
  ]
}
```

---

*Last updated: 2025-12-08*
