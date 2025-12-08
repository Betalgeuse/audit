'use client';

import { useState, useRef, useEffect } from 'react';
import { Market, AIMessage, AIResponse } from '@/types';
import aiResponsesAmat from '@/data/ai-responses-amat.json';
import aiResponsesSkhynix from '@/data/ai-responses-skhynix.json';

interface AISidebarProps {
  market: Market;
  messages: AIMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  currentContext: {
    page: number;
    section: string;
    highlight: string;
  };
}

export function AISidebar({
  market,
  messages,
  setMessages,
  currentContext,
}: AISidebarProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        { label: '회계정책', query: '회계정책 설명해줘' },
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

  const renderMarkdown = (content: string) => {
    let html = content
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
    
    return { __html: `<p>${html}</p>` };
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

      {/* Context Banner */}
      <div className="px-4 py-3 bg-blue-50 border-b text-sm">
        <div className="text-blue-800 font-medium">
          {market === 'US' ? 'Current Context:' : '현재 위치:'}
        </div>
        <div className="text-blue-600 text-xs mt-1">
          {market === 'US' ? 'Page' : '페이지'} {currentContext.page}
          {currentContext.section && ` • ${currentContext.section}`}
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

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`ai-message ai-message-${msg.role}`}
          >
            <div
              className="ai-message-content"
              dangerouslySetInnerHTML={renderMarkdown(msg.content)}
            />
            <div className="text-xs text-gray-400 mt-1">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

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

      {/* Suggestions */}
      <div className="px-4 py-3 border-t bg-gray-50">
        <div className="text-xs text-gray-500 mb-2">
          {market === 'US' ? 'Quick actions:' : '빠른 질문:'}
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
    </div>
  );
}
