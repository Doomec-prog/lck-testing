'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Minimize2, Aperture, Film } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/lib/translations';
import { useGlobalContext } from '@/context/GlobalContext';

interface ChatbotProps {
  lang: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = ({ lang }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get mobile menu state from global context
  const { isMobileMenuOpen } = useGlobalContext();
  
  // Animation States for "Aperture Creature"
  const [isRevealing, setIsRevealing] = useState(false); // Film strip reveal state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Magnetic hover
  const [flareOpacity, setFlareOpacity] = useState(0); // Random heartbeat flare

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get translations for current language
  const t = translations[lang].chatbot;

  // Define System Instruction (Knowledge Base) on client to pass to server
  const getSystemInstruction = () => {
    // We inject the actual website content into the AI's brain
    const siteContent = translations[lang];
    
    return `
    You are the "LCK Assistant" - the official AI consultant for the League of Cinematographers of Kazakhstan (LCK).
    
    YOUR KNOWLEDGE BASE (WEBSITE CONTENT):
    ${JSON.stringify(siteContent, null, 2)}
    
    INSTRUCTIONS:
    1. ROLE: You are a helpful, professional, and knowledgeable representative of LCK.
    2. SOURCE OF TRUTH: Answer questions based PRIMARILY on the "WEBSITE CONTENT" provided above. You know everything that is on the website (About us, Benefits, Activities, Contacts, etc.).
    3. TONE: Professional, welcoming, concise. You can use very light cinematic metaphors, but DO NOT write in screenplay format (no "EXT. DAY", no character names before lines). Just chat naturally.
    4. LANGUAGE: Answer strictly in ${lang}.
    5. UNKNOWN INFO: If the user asks something not in the knowledge base (e.g., specific current weather, unrelated topics), politely say you don't have that information and suggest contacting LCK via the form in the footer.
    6. BEHAVIOR: 
       - If asked "What can you do?", say you can tell them about the League, membership benefits, current activities, and contacts.
       - If asked about membership, summarize the "benefits" section.
       - If asked about contacts, provide the address or email from the footer section.
    `;
  };

  // --- ANIMATION LOGIC: RANDOM REVEAL ---
  useEffect(() => {
    if (isOpen) return;

    let revealTimeout: any;

    const triggerReveal = () => {
      setIsRevealing(true);
      
      // Hide after animation sequence
      setTimeout(() => {
        setIsRevealing(false);
        // Schedule next one randomly (15-30s)
        const nextDelay = Math.random() * (30000 - 15000) + 15000;
        revealTimeout = setTimeout(triggerReveal, nextDelay);
      }, 4000); // 4s total reveal duration
    };

    // First reveal happens quickly (3s) so the user sees the effect!
    const initialDelay = setTimeout(triggerReveal, 3000);

    // Random Heartbeat Flare Loop (2-6s)
    const scheduleFlare = () => {
      const delay = Math.random() * (6000 - 2000) + 2000;
      return setTimeout(() => {
        setFlareOpacity(Math.random() * 0.6 + 0.2); // Random brightness
        setTimeout(() => setFlareOpacity(0), 800); // Fade out
        flareTimeout = scheduleFlare();
      }, delay);
    };

    let flareTimeout = scheduleFlare();

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(revealTimeout);
      clearTimeout(flareTimeout);
    };
  }, [isOpen]);

  // --- MOUSE TRACKING (MAGNETIC EFFECT) ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isOpen) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Stronger movement (0.4) for "focus tracking" feel
    setMousePos({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // --- STANDARD CHAT LOGIC ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setIsRevealing(false); // Stop animation if opened
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    
    // Optimistic update
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          history: messages, // Send previous history to maintain context
          systemInstruction: getSystemInstruction()
        }),
      });

      if (!response.ok) {
        // Try to parse error details from server
        const errorData = await response.json().catch(() => ({}));
        console.error("SERVER ERROR:", errorData);
        throw new Error(errorData.details || errorData.error || `Server Error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text || "Scene missing... (Empty response)" }]);

    } catch (error: any) {
      console.error("CHATBOT ERROR:", error);
      // Show a more specific error in console, but a friendly one in UI
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `Connection Error: ${error.message || 'Cut! Please try again later.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // HIDE IF MOBILE MENU IS OPEN
  if (isMobileMenuOpen) return null;

  return (
    <>
      {/* --- APERTURE CREATURE TRIGGER --- */}
      <div 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center justify-center pointer-events-none"
        style={{
             // Ensure the area captures mouse even if button moves slightly
             width: '140px', height: '140px' 
        }}
      >
        {/* FILM STRIP REVEAL (Behind button) */}
        <div 
          className={`absolute bottom-1/2 w-16 bg-[#050505] border-x-[3px] border-dashed border-zinc-600 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center justify-start pt-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-40
            ${isRevealing ? 'h-40 translate-y-[-35px] opacity-100' : 'h-0 translate-y-10 opacity-0'}
          `}
        >
            {/* Film Grain Texture */}
            <div className="absolute inset-0 bg-white/10 opacity-30 animate-grain pointer-events-none"></div>
            
            {/* Content on Film */}
            <div className="flex flex-col items-center space-y-2 relative z-10">
                <span className="text-[12px] font-display text-gold-500 font-bold tracking-[0.2em] leading-none drop-shadow-md">LCK</span>
                <span className="text-[12px] font-display text-gold-500 font-bold tracking-[0.2em] leading-none drop-shadow-md">AI</span>
                <div className="w-8 h-[1px] bg-gold-500/50 my-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_5px_red]"></div>
            </div>
        </div>

        {/* BUTTON WRAPPER (Handles magnetic movement) */}
        <div 
           className="pointer-events-auto transition-transform duration-200 ease-out z-50 relative"
           style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
        >
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative group outline-none"
                aria-label="Open Director AI"
            >
                {/* Outer Glow / Pulse */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-gold-500/30 animate-pulse blur-md"></div>
                )}
                
                {/* Main Body - Lens Look */}
                <div className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full 
                    bg-radial-gradient from-zinc-800 to-black
                    border-[1.5px] border-gold-500/60 shadow-[0_0_30px_rgba(212,175,55,0.3)] 
                    transition-all duration-700 ease-in-out overflow-hidden
                    ${isOpen ? 'rotate-90 scale-90 bg-black' : 'hover:scale-110'}
                    ${isRevealing ? 'rotate-[360deg] scale-110 border-gold-400 shadow-[0_0_50px_rgba(212,175,55,0.5)]' : ''}
                `}>
                
                    {isOpen ? (
                        <X size={32} className="text-white relative z-20" />
                    ) : (
                        <>
                           {/* Internal "Lens Flare Heartbeat" */}
                           <div 
                              className="absolute w-full h-full bg-radial-gradient from-gold-100/30 to-transparent blur-xl pointer-events-none transition-opacity duration-1000 z-20"
                              style={{ opacity: flareOpacity }}
                           ></div>

                           {/* The Aperture Icon */}
                           {/* Using explicit style for breathing to bypass potential Tailwind config issues */}
                           <div 
                             className={`relative z-10 transition-all duration-500 flex items-center justify-center
                                ${isRevealing ? 'scale-75' : 'group-hover:rotate-[30deg] group-hover:scale-90'}
                             `}
                             style={{
                               animation: !isRevealing && mousePos.x === 0 ? 'breathing 4s ease-in-out infinite' : 'none',
                               transformOrigin: 'center'
                             }}
                           >
                              <Aperture 
                                size={44} 
                                strokeWidth={isRevealing ? 2.5 : 1.5}
                                className="text-gold-500 drop-shadow-lg"
                              />
                           </div>
                        </>
                    )}

                    {/* REC dot (Only when closed) */}
                    {!isOpen && !isRevealing && (
                        <div className="absolute top-2.5 right-2.5 flex h-3 w-3 z-30">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-black shadow-sm"></span>
                        </div>
                    )}
                </div>
            </button>
        </div>
      </div>

      {/* --- CINEMATIC MONITOR WINDOW --- */}
      <div
        className={`fixed z-50 bg-[#0a0a0a] border-zinc-800 flex flex-col overflow-hidden transition-all duration-500 shadow-[0_0_100px_rgba(0,0,0,1)]
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-90 translate-y-20 pointer-events-none'}
          
          /* Mobile: Fullscreen */
          bottom-0 right-0 w-full h-full rounded-none border-0
          
          /* Desktop: Floating Window */
          md:bottom-32 md:right-10 md:w-[450px] md:h-[650px] md:rounded-xl md:border md:origin-bottom-right
        `}
      >
        {/* Monitor Frame UI (Corners) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-500 pointer-events-none z-20 m-4 opacity-50"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-500 pointer-events-none z-20 m-4 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-500 pointer-events-none z-20 m-4 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-500 pointer-events-none z-20 m-4 opacity-50"></div>

        {/* Header */}
        <div className="bg-black/95 p-5 border-b border-white/10 flex justify-between items-center z-10 backdrop-blur-md shrink-0">
          <div className="flex items-center space-x-4">
            <Film size={20} className="text-gold-500" />
            <div>
              <h3 className="font-mono font-bold text-white uppercase tracking-widest text-sm">{t.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                 <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                 <span className="text-[10px] text-red-500 font-mono tracking-wider">{t.status}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
            <Minimize2 size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-zinc-950/50">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full"></div>
                <Aperture size={64} className="text-gold-500 relative animate-spin-slow" style={{ animationDuration: '20s' }} />
              </div>
              <div>
                <p className="text-white font-display font-bold text-2xl uppercase tracking-wider mb-2">
                  {t.systemReady}
                </p>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  {t.awaiting}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3 w-full max-w-[240px] mt-8">
                {t.prompts.map((qs, i) => (
                    <button 
                        key={i}
                        onClick={() => setInputValue(qs)}
                        className="text-xs font-bold text-gold-400 border border-gold-500/30 py-3 px-4 rounded hover:bg-gold-500 hover:text-black transition-all uppercase tracking-wider bg-black/50 backdrop-blur-sm"
                    >
                        [{qs}]
                    </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative z-10 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
            >
              <span className="text-[10px] font-mono uppercase text-zinc-500 mb-1 tracking-widest px-1">
                {msg.role === 'user' ? t.roleUser : t.roleAi}
              </span>

              {msg.role === 'model' ? (
                <div className="relative pl-5 border-l-2 border-gold-500 max-w-[90%]">
                   <p className="text-white text-base font-sans leading-relaxed whitespace-pre-line drop-shadow-sm">
                     {msg.text}
                   </p>
                </div>
              ) : (
                <div className="bg-zinc-800 text-white px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm text-sm font-medium max-w-[85%] shadow-lg border border-zinc-700">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-3 pl-5 border-l-2 border-gold-500/20 relative z-10">
              <Loader2 size={16} className="text-gold-500 animate-spin" />
              <span className="text-gold-500 font-mono text-xs animate-pulse tracking-widest">{t.generating}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black border-t border-white/10 relative z-10 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-center group">
            <span className="absolute left-4 text-gold-500 font-mono text-lg opacity-70 pointer-events-none">{`>`}</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-12 py-4 text-base font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-gold-500/20 transition-all shadow-inner"
              disabled={isLoading}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-3 p-2 text-zinc-500 hover:text-gold-500 transition-colors disabled:opacity-30 rounded-md hover:bg-white/5"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};