'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Market, AIMessage, AIResponse, SourceReference } from '@/types';
import aiResponsesAmat from '@/data/ai-responses-amat.json';
import aiResponsesSkhynix from '@/data/ai-responses-skhynix.json';
import { PDFModal } from './PDFModal';

interface AmountLinkData {
  amount: string;
  page: number;
  highlightText: string;
}

interface AISidebarProps {
  market: Market;
  messages: AIMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  currentContext: {
    page: number;
    section: string;
    highlight: string;
  };
  onSourceClick?: (ref: SourceReference) => void;
}

export function AISidebar({
  market,
  messages,
  setMessages,
  currentContext,
  onSourceClick,
}: AISidebarProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pdfModalData, setPdfModalData] = useState<AmountLinkData | null>(null);

  const aiData = market === 'US' ? aiResponsesAmat : aiResponsesSkhynix;
  
  const suggestions = market === 'US'
    ? [
        { label: 'Summarize', query: 'Summarize this section' },
        { label: 'Compare YoY', query: 'Compare to prior year' },
        { label: 'Risk factors', query: 'What are the risk factors?' },
        { label: 'Revenue breakdown', query: 'Show revenue breakdown' },
      ]
    : [
        { label: '요약', query: '이 주석 요약해줘' },
        { label: '전년 비교', query: '전년 대비 비교해줘' },
        { label: '설비투자액', query: '2024년도 반도체 설비 투자액 얼마야?' },
        { label: '연결/별도', query: '연결과 별도 재무제표 차이점은?' },
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    for (const resp of aiData.responses as AIResponse[]) {
      for (const trigger of resp.triggers) {
        if (lowerQuery.includes(trigger.toLowerCase())) {
          if (resp.context === 'general' || resp.context === currentContext.section) {
            return resp.response;
          }
        }
      }
    }
    
    for (const resp of aiData.responses as AIResponse[]) {
      for (const trigger of resp.triggers) {
        if (lowerQuery.includes(trigger.toLowerCase())) {
          return resp.response;
        }
      }
    }
    
    return aiData.defaultResponse;
  };

  const handleSubmit = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: AIMessage = {
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = findResponse(query);
    const assistantMessage: AIMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const parseSourceReference = useCallback((sourceText: string): SourceReference | null => {
    // Extract page number from patterns like "p.67", "p.45", "페이지 45"
    const pageMatch = sourceText.match(/p\.?\s*(\d+)|페이지\s*(\d+)|page\s*(\d+)/i);
    const page = pageMatch ? parseInt(pageMatch[1] || pageMatch[2] || pageMatch[3]) : 1;
    
    // Extract section from patterns like "Note 4", "주석 5"
    const sectionMatch = sourceText.match(/Note\s*(\d+)|주석\s*(\d+)/i);
    const section = sectionMatch ? `note-${sectionMatch[1] || sectionMatch[2]}` : undefined;
    
    return { page, section, label: sourceText };
  }, []);

  const handleSourceLinkClick = useCallback((sourceText: string) => {
    const ref = parseSourceReference(sourceText);
    if (ref && onSourceClick) {
      onSourceClick(ref);
    }
  }, [parseSourceReference, onSourceClick]);

  const renderMarkdown = (content: string) => {
    // First, extract and replace amount links with placeholders [[amount|p.page|highlight]]
    const amountLinkPattern = /\[\[([^|]+)\|p\.(\d+)\|([^\]]+)\]\]/g;
    const amountLinks: AmountLinkData[] = [];
    let processedContent = content.replace(amountLinkPattern, (match, amount, page, highlight) => {
      amountLinks.push({ amount: amount.trim(), page: parseInt(page), highlightText: highlight.trim() });
      return `__AMOUNT_LINK_${amountLinks.length - 1}__`;
    });

    // Extract and replace source references with placeholders
    const sourcePattern = /\[(Source|출처):\s*([^\]]+)\]/g;
    const sources: string[] = [];
    processedContent = processedContent.replace(sourcePattern, (match, type, sourceText) => {
      sources.push(sourceText.trim());
      return `__SOURCE_${sources.length - 1}__`;
    });

    let html = processedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/\|(.*?)\|/g, (match) => {
        const cells = match.split('|').filter(Boolean);
        return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
      });
    
    if (html.includes('<tr>')) {
      html = html.replace(/(<tr>.*<\/tr>)+/g, '<table class="w-full border-collapse my-2">$&</table>');
    }

    // Replace amount link placeholders with clickable links
    amountLinks.forEach((link, index) => {
      const linkHtml = `<span class="ai-amount-link" data-amount-index="${index}">${link.amount}</span>`;
      html = html.replace(`__AMOUNT_LINK_${index}__`, linkHtml);
    });

    // Replace source placeholders with clickable links
    sources.forEach((source, index) => {
      const linkHtml = `<span class="ai-source-link" data-source-index="${index}">📄 ${market === 'US' ? 'Source' : '출처'}: ${source}</span>`;
      html = html.replace(`__SOURCE_${index}__`, linkHtml);
    });
    
    return { __html: `<p>${html}</p>`, sources, amountLinks };
  };

  return (
    <div className="ai-sidebar">
      {/* Header */}
      <div className="ai-header">
        <h3>
          <span>🤖</span>
          {market === 'US' ? 'AI Document Assistant' : 'AI 문서 도우미'}
        </h3>
        <p className="text-sm opacity-80 mt-1">
          {market === 'US' 
            ? 'Ask questions about this document' 
            : '이 문서에 대해 질문하세요'}
        </p>
      </div>

      {/* Context Banner - BamSEC Style */}
      <div className="ai-context-banner">
        <div className="ai-context-label">
          {market === 'US' ? 'Current Context' : '현재 위치'}
        </div>
        <div className="ai-context-value">
          {market === 'US' ? 'Page' : '페이지'} {currentContext.page}
          {currentContext.section && ` · ${currentContext.section}`}
        </div>
      </div>

      {/* Messages */}
      <div className="ai-messages">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-sm">
              {market === 'US'
                ? 'Start a conversation about this document'
                : '문서에 대해 대화를 시작하세요'}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const rendered = renderMarkdown(msg.content);
          return (
            <div
              key={idx}
              className={`ai-message ai-message-${msg.role}`}
            >
              <div
                className="ai-message-content"
                dangerouslySetInnerHTML={rendered}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains('ai-source-link')) {
                    const sourceIndex = parseInt(target.dataset.sourceIndex || '0');
                    if (rendered.sources[sourceIndex]) {
                      handleSourceLinkClick(rendered.sources[sourceIndex]);
                    }
                  }
                  if (target.classList.contains('ai-amount-link')) {
                    const amountIndex = parseInt(target.dataset.amountIndex || '0');
                    if (rendered.amountLinks[amountIndex]) {
                      setPdfModalData(rendered.amountLinks[amountIndex]);
                    }
                  }
                }}
              />
              <div className="ai-message-timestamp">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="ai-message ai-message-assistant">
            <div className="ai-message-content flex items-center gap-2">
              <div className="loading-spinner"></div>
              <span className="text-gray-500">
                {market === 'US' ? 'Analyzing document...' : '문서 분석 중...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions - BamSEC Style */}
      <div className="ai-suggestions-container">
        <div className="ai-suggestions-label">
          {market === 'US' ? 'Quick Actions' : '빠른 질문'}
        </div>
        <div className="ai-suggestions">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="ai-suggestion-btn"
              onClick={() => handleSubmit(s.query)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="ai-input">
        <div className="ai-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(input)}
            placeholder={
              market === 'US'
                ? 'Ask a question about this document...'
                : '이 문서에 대해 질문하세요...'
            }
            disabled={isTyping}
          />
          <button
            onClick={() => handleSubmit(input)}
            disabled={!input.trim() || isTyping}
          >
            {market === 'US' ? 'Send' : '전송'}
          </button>
        </div>
      </div>

      {/* PDF Modal */}
      <PDFModal
        isOpen={!!pdfModalData}
        onClose={() => setPdfModalData(null)}
        market={market}
        targetPage={pdfModalData?.page || 1}
        highlightText={pdfModalData?.highlightText || ''}
      />
    </div>
  );
}
