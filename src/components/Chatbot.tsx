import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import Reveal from './Reveal';
import { sendMessageToGemini } from '../lib/gemini';

type ChatMessage = { id: string; role: 'user' | 'bot'; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: cryptoId(), role: 'bot', content: 'Olá! Sou o assistente do Mauro Zibane. Como posso ajudar?' },
  ]);
  const [isLoading, setIsLoading] = useState(false); // Novo estado de carregamento
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: cryptoId(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true); // Iniciar carregamento

    try {
      const geminiResponse = await sendMessageToGemini(trimmed);
      const botMsg: ChatMessage = { id: cryptoId(), role: 'bot', content: geminiResponse };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error fetching from Gemini API in Chatbot:", error);
      const errorMsg: ChatMessage = { id: cryptoId(), role: 'bot', content: 'Desculpe, houve um erro ao comunicar com a IA.' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false); // Finalizar carregamento
    }
  };

  const buttonTitle = useMemo(() => (open ? 'Fechar chat' : 'Abrir chat'), [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[60]">

      <button
        aria-label={buttonTitle}
        title={buttonTitle}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-[min(92vw,360px)] rounded-xl border bg-card shadow-xl animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="font-semibold text-foreground">Assistente do Mauro</p>
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="rounded-full p-2 transition-colors hover:bg-muted">
              <X size={20} />
            </button>
          </div>
          <div className="h-72 overflow-y-auto px-4 py-3 grid gap-3" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((m, i) => (
              <Reveal key={m.id} delayMs={i * 50}>
                <div className={m.role === 'user' ? 'justify-self-end' : 'justify-self-start'}>
                  <div className={[
                    'rounded-2xl px-4 py-2 text-sm max-w-[85%] break-words',
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none',
                  ].join(' ')}>
                    {m.content}
                  </div>
                </div>
              </Reveal>
            ))}
            {isLoading && (
              <Reveal delayMs={messages.length * 50} key="loading">
                <div className="justify-self-start">
                  <div className="bg-muted text-foreground rounded-2xl px-4 py-2 text-sm max-w-[85%] break-words rounded-bl-none">
                    Digitando...
                  </div>
                </div>
              </Reveal>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-4 py-3 border-t">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                rows={1}
                placeholder="Faça uma pergunta rápida..."
                className="flex-1 resize-none rounded-md border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading} // Desabilitar input enquanto carrega
              />
              <button
                onClick={handleSend}
                className="inline-flex items-center justify-center gap-1 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Enviar"
                disabled={isLoading} // Desabilitar botão enquanto carrega
              >
                <Send size={18} />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function cryptoId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2);
}




