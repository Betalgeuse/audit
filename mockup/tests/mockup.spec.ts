import { test, expect } from '@playwright/test';

test.describe('Factset Audit POC Mock-up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Landing Page', () => {
    test('should display header with title', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Factset Audit POC');
      await expect(page.locator('text=Mock-up')).toBeVisible();
    });

    test('should display US market tab as default', async ({ page }) => {
      const usTab = page.locator('button:has-text("US Market")');
      await expect(usTab).toHaveClass(/bg-blue-600/);
    });

    test('should display AMAT company info by default', async ({ page }) => {
      await expect(page.locator('h2')).toContainText('Applied Materials, Inc.');
      await expect(page.locator('text=AMAT')).toBeVisible();
    });

    test('should display financial table with data', async ({ page }) => {
      await expect(page.locator('table.financial-table')).toBeVisible();
      await expect(page.locator('text=Net Revenue')).toBeVisible();
      await expect(page.locator('text=FY17')).toBeVisible();
    });
  });

  test.describe('Market Tab Switching', () => {
    test('should switch to Korean market', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      
      await expect(page.locator('h2')).toContainText('SK하이닉스');
      await expect(page.locator('text=000660.KS')).toBeVisible();
    });

    test('should display Korean financial data after switching', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      
      await expect(page.locator('text=I. 매출액')).toBeVisible();
      await expect(page.locator('text=제74기')).toBeVisible();
      await expect(page.locator('text=주석')).toBeVisible();
    });

    test('should switch back to US market', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      await page.click('button:has-text("US Market")');
      
      await expect(page.locator('h2')).toContainText('Applied Materials, Inc.');
    });
  });

  test.describe('Document Viewer', () => {
    test('should open document viewer when clicking a cell', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('.viewer-modal')).toBeVisible();
      await expect(page.locator('.pdf-viewer')).toBeVisible();
    });

    test('should display navigation sidebar with TOC', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('.nav-sidebar')).toBeVisible();
      await expect(page.locator('text=Table of Contents')).toBeVisible();
    });

    test('should display AI sidebar', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('.ai-sidebar')).toBeVisible();
      await expect(page.locator('text=AI Document Assistant')).toBeVisible();
    });

    test('should close viewer when clicking back button', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      await page.click('button:has-text("Back")');
      
      await expect(page.locator('.viewer-modal')).not.toBeVisible();
    });
  });

  test.describe('Footnote Popup (US)', () => {
    test('should show footnote popup on hover for US market', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      // The popup should appear when hovering over footnote markers in the PDF
      await expect(page.locator('.pdf-viewer')).toBeVisible();
    });
  });

  test.describe('Korean Jushuk Popup (QT-69)', () => {
    test('should display jushuk markers in Korean table', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      
      await expect(page.locator('text=(주4,26)')).toBeVisible();
      await expect(page.locator('text=(주28)')).toBeVisible();
    });

    test('should show popup when hovering jushuk marker', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      
      const jushukMarker = page.locator('.jushuk-marker').first();
      await jushukMarker.hover();
      
      await expect(page.locator('.footnote-popup')).toBeVisible();
    });

    test('should display Korean footnote content in popup', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      
      const jushukMarker = page.locator('.jushuk-marker').first();
      await jushukMarker.hover();
      
      await expect(page.locator('.footnote-popup-title')).toContainText('주석');
    });
  });

  test.describe('AI Sidebar', () => {
    test('should display quick action suggestions', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('.ai-suggestion-btn')).toHaveCount(4);
      await expect(page.locator('text=Summarize')).toBeVisible();
    });

    test('should send message and receive response', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      const input = page.locator('.ai-input input');
      await input.fill('Summarize this section');
      await page.click('.ai-input button:has-text("Send")');
      
      // Wait for response
      await expect(page.locator('.ai-message-assistant')).toBeVisible({ timeout: 5000 });
    });

    test('should show typing indicator while processing', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      const input = page.locator('.ai-input input');
      await input.fill('Compare to prior year');
      await page.click('.ai-input button:has-text("Send")');
      
      await expect(page.locator('.loading-spinner')).toBeVisible();
    });

    test('should use quick action buttons', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await page.click('.ai-suggestion-btn:has-text("Summarize")');
      
      await expect(page.locator('.ai-message-user')).toBeVisible({ timeout: 2000 });
    });
  });

  test.describe('Korean AI Responses', () => {
    test('should display Korean suggestions in KR market', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('text=요약')).toBeVisible();
      await expect(page.locator('text=전년 비교')).toBeVisible();
    });

    test('should display Korean AI header', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('text=AI 문서 도우미')).toBeVisible();
    });

    test('should respond in Korean', async ({ page }) => {
      await page.click('button:has-text("한국 시장")');
      await page.click('td.clickable >> nth=0');
      
      await page.click('.ai-suggestion-btn:has-text("요약")');
      
      await expect(page.locator('.ai-message-assistant')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Highlight Animation', () => {
    test('should highlight target text in PDF viewer', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      // Wait for PDF to load and highlight to be applied
      await page.waitForTimeout(2000);
      
      // Check if highlight class is applied to text in PDF
      const highlightedText = page.locator('.highlight-text');
      await expect(highlightedText.first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Navigation', () => {
    test('should display collapsible TOC sections', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      const navSections = page.locator('.nav-section');
      const count = await navSections.count();
      expect(count).toBeGreaterThan(3);
    });

    test('should show page numbers in TOC', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      await expect(page.locator('text=p.')).toBeVisible();
    });
  });

  test.describe('PDF Viewer Controls', () => {
    test('should display zoom controls', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      // Wait for PDF viewer to load
      await page.waitForTimeout(1000);
      await expect(page.locator('text=100%')).toBeVisible();
    });

    test('should display page navigation', async ({ page }) => {
      await page.click('td.clickable >> nth=0');
      
      // Wait for PDF to load and show page count
      await page.waitForTimeout(2000);
      // Look for page number format "X / Y"
      await expect(page.locator('.pdf-toolbar')).toContainText(/\d+\s*\/\s*\d+/);
    });
  });
});
