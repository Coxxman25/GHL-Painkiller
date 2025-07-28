'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles,
  X,
  Zap,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const AIChatOverlay: React.FC<AIChatOverlayProps> = ({ 
  isVisible, 
  onClose,
  onMouseEnter,
  onMouseLeave 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I can help you with that! Let me analyze your GoHighLevel setup and suggest some automation solutions for "${inputValue}".`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-16 top-0 h-full w-96 bg-[var(--background-secondary)]/95 backdrop-blur-xl border-r border-[var(--border-primary)] z-50 pointer-events-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border-primary)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">AI Companion</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Your GoHighLevel automation assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 p-0 hover:bg-[var(--surface-hover)]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-primary)] flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-6 h-6 text-[var(--aurora-primary)]" />
                    </div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-2">Welcome to AI Companion</h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                      I'm here to help you optimize your GoHighLevel workflows and solve automation challenges.
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs text-[var(--text-tertiary)] font-medium uppercase tracking-wider">Try asking:</div>
                      <div className="space-y-1">
                        {[
                          "How can I automate lead follow-up?",
                          "Create a missed call automation",
                          "Help me build a funnel health dashboard"
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInputValue(suggestion)}
                            className="block w-full text-left px-3 py-2 text-sm bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] border border-[var(--border-primary)] rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-[var(--aurora-primary)] text-white' 
                          : 'bg-[var(--surface-elevated)] border border-[var(--border-primary)] text-[var(--aurora-primary)]'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3" />
                        ) : (
                          <Bot className="w-3 h-3" />
                        )}
                      </div>
                      <div className={`px-3 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-[var(--aurora-primary)] text-white'
                          : 'bg-[var(--surface-elevated)] border border-[var(--border-primary)] text-[var(--text-primary)]'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' 
                            ? 'text-white/70' 
                            : 'text-[var(--text-tertiary)]'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="w-6 h-6 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-primary)] text-[var(--aurora-primary)] flex items-center justify-center">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-primary)]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[var(--aurora-primary)] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[var(--aurora-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[var(--aurora-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-[var(--border-primary)]">
              <div className="flex space-x-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about GoHighLevel automation..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none bg-[var(--surface-glass)] border-[var(--border-primary)] focus:border-[var(--aurora-primary)]/50 focus:ring-[var(--aurora-primary)]/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] hover:from-[var(--aurora-primary)]/90 hover:to-[var(--aurora-secondary)]/90 text-white border-0 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-[var(--text-tertiary)]">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <div className="flex items-center space-x-1 text-xs text-[var(--text-tertiary)]">
                  <Zap className="w-3 h-3" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};