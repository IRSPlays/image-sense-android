
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, User, Bot, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { chatWithFishExpert } from '@/services/geminiService';
import ThemeToggle from '@/components/ThemeToggle';
import { useLocation, useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
}

// Helper function to render markdown bold text
const renderMarkdownBold = (text: string) => {
  if (!text) return '';
  
  // Replace markdown bold syntax (**text**) with HTML <strong> tags
  const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  return formattedText;
};

const FishChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'initial',
      content: "Hello! I'm your fish expert. Ask me anything about fish, aquatic species, or marine life.",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Handle incoming question from URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const question = searchParams.get('question');
    
    if (question && chatHistory.length === 1) {
      handleAskQuestion(question);
      // Clear the URL parameter after processing
      navigate('/fish-chat', { replace: true });
    }
  }, [location.search]);

  const handleAskQuestion = async (questionText: string) => {
    if (!questionText.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: questionText,
      isUser: true,
    };
    
    setChatHistory((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from AI
      const response = await chatWithFishExpert(questionText);
      
      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
      };
      
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    await handleAskQuestion(message);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-6 px-4 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold font-fishify">Fish Expert Chat</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 rounded-lg p-4 bg-muted/20 border">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border shadow-sm"
                }`}
              >
                <div className="flex items-center mb-2">
                  {msg.isUser ? (
                    <>
                      <span className="text-sm font-medium">You</span>
                      <User className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Fish Expert</span>
                      <Bot className="h-4 w-4 ml-1" />
                    </>
                  )}
                </div>
                <div 
                  className="whitespace-pre-wrap text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: msg.isUser ? msg.content : renderMarkdownBold(msg.content) }}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-lg bg-card border shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium">Fish Expert</span>
                  <Bot className="h-4 w-4 ml-1" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about any fish or marine life..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? (
              <ArrowUp className="h-4 w-4 animate-pulse" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default FishChat;
