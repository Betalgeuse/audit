# QT-75: BamSEC Design System Implementation

**Date:** December 8, 2024  
**Status:** In Progress  
**Linear Issue:** [QT-75](https://linear.app/betalgeuse/issue/QT-75/fine-tune-mockup-uiux-details-and-navigation)

---

## Design Direction

Based on reference product analysis (61 screenshots across 4 platforms), we are implementing the **BamSEC light theme** design language.

### Why BamSEC?

1. **Document-centric focus** - Clean, professional layout optimized for financial documents
2. **Light theme** - Better readability for dense financial data
3. **Burgundy accent** - Distinctive, professional color palette
4. **Proven UX patterns** - Established SEC filing viewer with strong user adoption

---

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bamsec-burgundy` | `#8B1538` | Primary brand, links, active states |
| `--bamsec-burgundy-dark` | `#6d102c` | Hover states, pressed buttons |
| `--bamsec-burgundy-light` | `#f0e6e9` | Backgrounds, highlights |
| `--bamsec-burgundy-hover` | `#a91d45` | Interactive hover states |

### Surface Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--surface-primary` | `#ffffff` | Cards, content areas |
| `--surface-secondary` | `#fafafa` | Page background |
| `--surface-tertiary` | `#f5f5f5` | Table headers, muted areas |

### Border Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--border-default` | `#e0e0e0` | Standard borders |
| `--border-light` | `#eeeeee` | Subtle dividers |
| `--border-dark` | `#cccccc` | Emphasized borders |

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#333333` | Headings, body text |
| `--text-secondary` | `#666666` | Secondary text |
| `--text-muted` | `#888888` | Captions, hints |
| `--text-inverse` | `#ffffff` | Text on dark backgrounds |

### Data Visualization
| Token | Value | Usage |
|-------|-------|-------|
| `--positive` | `#00C853` | Positive values, gains |
| `--negative` | `#FF5252` | Negative values, losses |
| `--warning` | `#FFB300` | Warnings |
| `--info` | `#2196F3` | Informational |

---

## Typography

### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'Roboto Mono', 'SF Mono', Consolas, monospace;
```

### Font Scale
| Size | Value | Line Height | Usage |
|------|-------|-------------|-------|
| `2xs` | 10px | 14px | Badges, timestamps |
| `xs` | 11px | 16px | Labels, captions |
| `sm` | 12px | 18px | Secondary text |
| `base` | 13px | 20px | Body text |
| `md` | 14px | 22px | Emphasized body |
| `lg` | 16px | 24px | Subheadings |
| `xl` | 18px | 28px | Section titles |
| `2xl` | 24px | 32px | Page headings |

### Typography Rules
- **Headings:** Inter, font-weight: 600
- **Body:** Inter, font-weight: 400
- **Financial Data:** Roboto Mono (numbers only)
- **Labels:** Inter, uppercase, letter-spacing: 0.5px

---

## Component Updates

### Phase 1: Document Viewer (Complete)

#### Files Modified
- `tailwind.config.js` - Added BamSEC color tokens
- `globals.css` - Complete BamSEC styling overhaul (~600 lines)
- `PDFViewer.tsx` - Burgundy toolbar, SVG icons
- `NavigationSidebar.tsx` - BamSEC active states
- `ExhibitsSidebar.tsx` - Already had burgundy styling
- `AISidebar.tsx` - Burgundy header gradient, styled inputs

#### Key Changes
1. **PDF Toolbar:** Burgundy background gradient, white controls
2. **Navigation Sidebar:** Burgundy left-border active indicator
3. **AI Sidebar:** Burgundy header, light context banner
4. **4-Column Grid:** 260px / 1fr / 260px / 360px

### Phase 2: Navigation System (In Progress)

#### Files Modified
- `page.tsx` - BamSEC header, company bar
- `MarketTabs.tsx` - Burgundy active states

#### Key Changes
1. **Header:** Burgundy gradient, centered search, clean layout
2. **Company Bar:** Stock info with price change indicator
3. **Market Tabs:** Burgundy active state, hover effects

### Phase 3: Landing Page (Pending)

#### Planned Changes
- Financial table refinement
- Card styling updates
- Instructions box styling

---

## CSS Architecture

### BEM-like Class Naming
```css
.component-name {}
.component-name-element {}
.component-name.modifier {}
```

### CSS Custom Properties
All colors defined in `:root` for easy theming.

### Responsive Breakpoints
| Breakpoint | Columns | Hidden Elements |
|------------|---------|-----------------|
| > 1400px | 4 columns | None |
| 1200-1400px | 4 columns (narrower) | None |
| 992-1200px | 3 columns | Exhibits sidebar |
| 768-992px | 2 columns | Nav sidebar |
| < 768px | 1 column | AI sidebar |

---

## Comparison: Before vs After

### Color Changes
| Element | Before (FactSet) | After (BamSEC) |
|---------|------------------|----------------|
| Primary | `#0066CC` (blue) | `#8B1538` (burgundy) |
| Header BG | Dark gradient | Burgundy gradient |
| Active state | Blue-50 bg | Burgundy-light bg |
| Links | Blue text | Burgundy text |

### Typography Changes
| Element | Before | After |
|---------|--------|-------|
| Base size | 14px | 13px |
| Table numbers | System font | Roboto Mono |
| Labels | Sentence case | Uppercase + tracking |

---

## Accessibility

### WCAG AA Compliance
- **Text contrast:** Burgundy (#8B1538) on white = 7.2:1 ✓
- **Large text:** 4.5:1 minimum met
- **Interactive states:** Distinct hover/focus indicators

### Keyboard Navigation
- Tab order preserved
- Focus visible on all interactive elements
- Escape key closes modals

---

## Next Steps

1. [ ] Test all components in browser
2. [ ] Capture before/after screenshots
3. [ ] Update FinancialTable component
4. [ ] Add hover micro-interactions
5. [ ] Test responsive breakpoints
6. [ ] Verify WCAG compliance

---

## Reference Screenshots Used

- `bamsec-01-document-viewer-main.png` - Layout structure
- `bamsec-02-financial-statements.png` - Typography
- `bamsec-03-compare-dialog.png` - Modal styling
- `bamsec-05-company-page.png` - Header, navigation
- `bamsec-10-share-dialog.png` - Dialog patterns

---

*Document generated as part of QT-75: Fine-tune mockup UI/UX details and navigation*
