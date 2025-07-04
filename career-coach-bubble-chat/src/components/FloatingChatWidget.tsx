import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, FileText, Target, BarChart3, Search, Minimize2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

type FeatureTab = 'chat' | 'resume' | 'career' | 'jobs' | 'skills';

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Career Coach. Choose a feature below or chat with me directly! 🚀",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<FeatureTab>('chat');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      setIsLoading(true);

      // Simulate AI response with loading
      setTimeout(() => {
        const responses = [
          "Great question! I can help you with that. Let me analyze your request and provide personalized recommendations.",
          "I understand your career goals. Based on your query, here are some strategic insights to help you succeed.",
          "Excellent! I've processed your request. Let me share some tailored advice for your professional development.",
          "That's a smart approach! I can guide you through this step-by-step with proven strategies.",
        ];
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        
        if (!isOpen) {
          setHasUnreadMessages(true);
        }
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };

  const handleTabChange = (tab: FeatureTab) => {
    setActiveTab(tab);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const renderFeatureContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'resume':
        return (
          <div className="p-4 space-y-3 animate-fade-in">
            <h3 className="font-semibold text-gray-800">Resume Analyzer</h3>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">📄 Upload your resume for AI analysis</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg">
                Upload Resume
              </Button>
            </div>
          </div>
        );
      case 'career':
        return (
          <div className="p-4 space-y-3 animate-fade-in">
            <h3 className="font-semibold text-gray-800">Career Planning</h3>
            <div className="space-y-2">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-800">🎯 Build your personalized career roadmap</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg">
                Start Planning
              </Button>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="p-4 space-y-3 animate-fade-in">
            <h3 className="font-semibold text-gray-800">Job Search</h3>
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">🔍 Find opportunities matching your profile</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg">
                Search Jobs
              </Button>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="p-4 space-y-3 animate-fade-in">
            <h3 className="font-semibold text-gray-800">Skill Gap Analysis</h3>
            <div className="space-y-2">
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">📊 Identify skills to advance your career</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg">
                Analyze Skills
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-48">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  } shadow-sm animate-fade-in`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        );
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-50 flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-12' : 'h-96'
        } animate-scale-in`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-t-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Career Coach</h3>
                  <p className="text-xs text-blue-100">Powered by GenAI</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0 rounded-full"
                >
                  <Minimize2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Feature Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as FeatureTab)} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-5 bg-gray-50 rounded-none border-b">
                  <TabsTrigger value="chat" className="p-2 hover:bg-blue-50 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="resume" className="p-2 hover:bg-blue-50 transition-colors">
                    <FileText className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="career" className="p-2 hover:bg-purple-50 transition-colors">
                    <Target className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="jobs" className="p-2 hover:bg-green-50 transition-colors">
                    <Search className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="p-2 hover:bg-orange-50 transition-colors">
                    <BarChart3 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                  {renderFeatureContent()}
                  
                  {/* Input for chat */}
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 rounded-full border-gray-200 focus:border-blue-400 focus:ring-blue-400 text-sm"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full h-8 w-8 p-0 shadow-lg transition-all duration-200 hover:scale-105"
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resume" className="flex-1 mt-0">
                  {renderFeatureContent()}
                </TabsContent>

                <TabsContent value="career" className="flex-1 mt-0">
                  {renderFeatureContent()}
                </TabsContent>

                <TabsContent value="jobs" className="flex-1 mt-0">
                  {renderFeatureContent()}
                </TabsContent>

                <TabsContent value="skills" className="flex-1 mt-0">
                  {renderFeatureContent()}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      )}

      {/* Floating Button with Label */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
        {/* Hover Label */}
        {showLabel && (
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-fade-in">
            AI Career Coach
          </div>
        )}
        
        <Button
          onClick={toggleChat}
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transition-all duration-300 hover:scale-110 relative group animate-bounce-gentle"
        >
          <MessageSquare className="h-5 w-5 text-white" />
          
          {/* Notification Badge */}
          {hasUnreadMessages && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
              <div className="w-full h-full bg-red-400 rounded-full animate-ping"></div>
            </div>
          )}
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-ping"></div>
        </Button>
      </div>
    </>
  );
};
