"use client";
import { useState } from "react";
import { Send, Sparkles, User, Coffee } from "lucide-react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI Smart Cafe assistant. I can recommend drinks based on your mood, answer questions about our menu, or help you make a reservation. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });
      
      const data = await response.json();
      
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I ran into an error." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I am offline right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden flex flex-col pt-20">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-primary-container)]/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="px-6 w-full max-w-4xl mx-auto flex-1 flex flex-col relative z-10 min-h-[calc(100vh-150px)]">
        <div className="text-center mb-6 pt-8">
          <h1 className="text-3xl md:text-5xl font-hanken font-extrabold mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
            AI Assistant
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-sm">
            Powered by advanced recommendations
          </p>
        </div>

        <div className="flex-1 glass-card rounded-3xl flex flex-col overflow-hidden mb-8 min-h-[500px]">
          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "bg-[var(--color-surface-bright)] text-[var(--color-on-surface)]"}`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-tr-sm" : "bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-tl-sm whitespace-pre-wrap"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[var(--color-surface-bright)] text-[var(--color-on-surface)]">
                  <Coffee className="w-5 h-5 animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-tl-sm flex gap-1 items-center">
                  <span className="w-2 h-2 bg-[var(--color-on-surface-variant)] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[var(--color-on-surface-variant)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-2 h-2 bg-[var(--color-on-surface-variant)] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-[var(--color-surface-bright)]">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-[var(--color-on-primary)] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(242,202,80,0.3)] disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex justify-center gap-2 flex-wrap mt-4 text-xs font-geist text-[var(--color-on-surface-variant)]">
              <button className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors" onClick={() => setInput("Recommend a strong coffee")}>"Recommend a strong coffee"</button>
              <button className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors" onClick={() => setInput("Do you have vegan options?")}>"Do you have vegan options?"</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
