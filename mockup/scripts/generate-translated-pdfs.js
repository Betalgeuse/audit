const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// SK Hynix 재무 데이터 (동일 숫자 유지)
const financialData = {
  revenue: '66,191,492',
  operatingProfit: '7,502,320',
  netIncome: '5,853,842',
  totalAssets: '115,234,567',
  totalLiabilities: '45,678,901',
  totalEquity: '69,555,666',
  period: '2024.01.01 - 2024.12.31',
};

// 언어별 번역
const translations = {
  ko: {
    title: 'SK하이닉스 주식회사',
    subtitle: '사업보고서',
    period: '2024년 1월 1일 - 2024년 12월 31일',
    financialStatements: '연결 재무제표',
    incomeStatement: '연결 손익계산서',
    balanceSheet: '연결 재무상태표',
    revenue: '매출액',
    operatingProfit: '영업이익',
    netIncome: '당기순이익',
    totalAssets: '자산총계',
    totalLiabilities: '부채총계',
    totalEquity: '자본총계',
    unit: '(단위: 백만원)',
    page: '페이지',
  },
  en: {
    title: 'SK hynix Inc.',
    subtitle: 'Annual Report',
    period: 'January 1, 2024 - December 31, 2024',
    financialStatements: 'Consolidated Financial Statements',
    incomeStatement: 'Consolidated Income Statement',
    balanceSheet: 'Consolidated Balance Sheet',
    revenue: 'Revenue',
    operatingProfit: 'Operating Profit',
    netIncome: 'Net Income',
    totalAssets: 'Total Assets',
    totalLiabilities: 'Total Liabilities',
    totalEquity: 'Total Equity',
    unit: '(Unit: KRW Million)',
    page: 'Page',
  },
  ja: {
    title: 'SKハイニックス株式会社',
    subtitle: '事業報告書',
    period: '2024年1月1日 - 2024年12月31日',
    financialStatements: '連結財務諸表',
    incomeStatement: '連結損益計算書',
    balanceSheet: '連結貸借対照表',
    revenue: '売上高',
    operatingProfit: '営業利益',
    netIncome: '当期純利益',
    totalAssets: '資産合計',
    totalLiabilities: '負債合計',
    totalEquity: '純資産合計',
    unit: '(単位: 百万ウォン)',
    page: 'ページ',
  },
  zh: {
    title: 'SK海力士股份有限公司',
    subtitle: '年度报告',
    period: '2024年1月1日 - 2024年12月31日',
    financialStatements: '合并财务报表',
    incomeStatement: '合并利润表',
    balanceSheet: '合并资产负债表',
    revenue: '营业收入',
    operatingProfit: '营业利润',
    netIncome: '净利润',
    totalAssets: '资产总计',
    totalLiabilities: '负债总计',
    totalEquity: '所有者权益',
    unit: '(单位: 百万韩元)',
    page: '页',
  },
};

function generatePDF(lang, outputPath) {
  const t = translations[lang];
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Page 1: Cover Page
  doc.setFillColor(128, 0, 32); // Burgundy
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(t.title, pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text(t.subtitle, pageWidth / 2, 45, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(t.period, pageWidth / 2, 100, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`${t.page} 1`, pageWidth / 2, pageHeight - 15, { align: 'center' });

  // Page 2: Income Statement
  doc.addPage();
  doc.setFillColor(128, 0, 32);
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(t.incomeStatement, margin, 13);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(t.unit, pageWidth - margin, 30, { align: 'right' });
  
  // Table
  const tableStartY = 45;
  const rowHeight = 12;
  const col1Width = 80;
  
  // Header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, tableStartY, pageWidth - 2 * margin, rowHeight, 'F');
  doc.setFontSize(11);
  doc.text(lang === 'ko' ? '항목' : (lang === 'en' ? 'Item' : (lang === 'ja' ? '項目' : '项目')), margin + 5, tableStartY + 8);
  doc.text(lang === 'ko' ? '금액' : (lang === 'en' ? 'Amount' : (lang === 'ja' ? '金額' : '金额')), pageWidth - margin - 30, tableStartY + 8, { align: 'right' });
  
  // Rows
  const incomeRows = [
    [t.revenue, financialData.revenue],
    [t.operatingProfit, financialData.operatingProfit],
    [t.netIncome, financialData.netIncome],
  ];
  
  incomeRows.forEach((row, idx) => {
    const y = tableStartY + rowHeight * (idx + 1);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);
    doc.text(row[0], margin + 5, y + 8);
    doc.text(row[1], pageWidth - margin - 5, y + 8, { align: 'right' });
  });
  
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`${t.page} 2`, pageWidth / 2, pageHeight - 15, { align: 'center' });

  // Page 3: Balance Sheet
  doc.addPage();
  doc.setFillColor(128, 0, 32);
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(t.balanceSheet, margin, 13);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(t.unit, pageWidth - margin, 30, { align: 'right' });
  
  // Header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, tableStartY, pageWidth - 2 * margin, rowHeight, 'F');
  doc.setFontSize(11);
  doc.text(lang === 'ko' ? '항목' : (lang === 'en' ? 'Item' : (lang === 'ja' ? '項目' : '项目')), margin + 5, tableStartY + 8);
  doc.text(lang === 'ko' ? '금액' : (lang === 'en' ? 'Amount' : (lang === 'ja' ? '金額' : '金额')), pageWidth - margin - 30, tableStartY + 8, { align: 'right' });
  
  // Rows
  const balanceRows = [
    [t.totalAssets, financialData.totalAssets],
    [t.totalLiabilities, financialData.totalLiabilities],
    [t.totalEquity, financialData.totalEquity],
  ];
  
  balanceRows.forEach((row, idx) => {
    const y = tableStartY + rowHeight * (idx + 1);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);
    doc.text(row[0], margin + 5, y + 8);
    doc.text(row[1], pageWidth - margin - 5, y + 8, { align: 'right' });
  });
  
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`${t.page} 3`, pageWidth / 2, pageHeight - 15, { align: 'center' });

  // Save
  const pdfBuffer = doc.output('arraybuffer');
  fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));
  console.log(`Generated: ${outputPath}`);
}

// Generate PDFs
const outputDir = path.join(__dirname, '../public/pdfs');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate translated versions
generatePDF('en', path.join(outputDir, 'sk_hynix_10k_en.pdf'));
generatePDF('ja', path.join(outputDir, 'sk_hynix_10k_ja.pdf'));
generatePDF('zh', path.join(outputDir, 'sk_hynix_10k_zh.pdf'));

console.log('All translated PDFs generated successfully!');
