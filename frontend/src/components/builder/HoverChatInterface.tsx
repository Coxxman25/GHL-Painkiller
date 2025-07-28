'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Code, 
  Eye, 
  Settings, 
  Bot, 
  User, 
  Send, 
  Sparkles,
  FileText,
  Zap,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface HoverChatInterfaceProps {
  className?: string;
  onPreviewChange?: (content: string) => void;
}

export const HoverChatInterface: React.FC<HoverChatInterfaceProps> = ({ 
  className = '',
  onPreviewChange 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const iconBarItems = [
    { icon: MessageSquare, label: 'Chat', active: true },
    { icon: Code, label: 'Code' },
    { icon: Eye, label: 'Preview' },
    { icon: FileText, label: 'Files' },
    { icon: Settings, label: 'Settings' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // Small delay to prevent flickering
  };

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
        content: `I'll help you build that! Let me create a ${inputValue.toLowerCase()} for you.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Update preview content
      const newPreviewContent = `
        <div class="p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Generated: ${inputValue}</h1>
          <p class="text-gray-600">This is a preview of your generated content...</p>
        </div>
      `;
      setPreviewContent(newPreviewContent);
      onPreviewChange?.(newPreviewContent);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${className}`}>
      {/* Icon Bar */}
      <motion.div
        className="absolute left-0 top-0 h-full w-16 bg-surface/95 backdrop-blur-xl border-r border-border/50 pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col items-center py-4 space-y-2">
          {iconBarItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                item.active 
                  ? 'bg-aurora-primary text-white shadow-lg shadow-aurora-primary/25' 
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute left-16 top-0 h-full w-96 bg-surface/95 backdrop-blur-xl border-r border-border/50 pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-aurora-primary to-aurora-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">AI Builder</h3>
                    <p className="text-sm text-text-secondary">Describe what you want to build</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border/50 flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-6 h-6 text-aurora-primary" />
                      </div>
                      <h4 className="font-medium text-text-primary mb-2">Start Building</h4>
                      <p className="text-sm text-text-secondary">Tell me what you'd like to create and I'll help you build it.</p>
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
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-aurora-primary text-white' 
                            : 'bg-surface-elevated border border-border/50 text-aurora-primary'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-3 h-3" />
                          ) : (
                            <Bot className="w-3 h-3" />
                          )}
                        </div>
                        <div className={`px-3 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-aurora-primary text-white rounded-br-md'
                            : 'bg-surface-elevated text-text-primary border border-border/50 rounded-bl-md'
                        }`}>
                          <p className="text-sm">{message.content}</p>
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
                        <div className="w-6 h-6 rounded-full bg-surface-elevated border border-border/50 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-aurora-primary" />
                        </div>
                        <div className="bg-surface-elevated text-text-primary rounded-2xl rounded-bl-md border border-border/50 px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-aurora-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-aurora-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-aurora-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you want to build..."
                    className="flex-1 min-h-[44px] max-h-32 resize-none bg-surface-elevated border-border/50 focus:border-aurora-primary"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="h-11 px-3 bg-aurora-primary hover:bg-aurora-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Area */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute left-[25rem] top-0 right-0 h-full bg-surface/95 backdrop-blur-xl border-l border-border/50 pointer-events-auto"
          >
            <div className="flex flex-col h-full">
              {/* Preview Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Live Preview</h3>
                      <p className="text-sm text-text-secondary">See your creation come to life</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="w-4 h-4" />
                    Run
                  </Button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 p-4">
                {previewContent ? (
                  <Card className="h-full border-border/50">
                    <CardContent className="p-0 h-full">
                      <div 
                        className="w-full h-full rounded-lg overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-surface-elevated border border-border/50 flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-aurora-primary" />
                      </div>
                      <h4 className="font-medium text-text-primary mb-2">Ready to Preview</h4>
                      <p className="text-sm text-text-secondary max-w-sm">
                        Start a conversation with the AI to see your creation appear here in real-time.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};