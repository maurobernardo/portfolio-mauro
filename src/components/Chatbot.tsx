import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import Reveal from './Reveal';

type ChatMessage = { id: string; role: 'user' | 'bot'; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: cryptoId(), role: 'bot', content: 'Olá! Sou o assistente do Mauro Zibane. Como posso ajudar?' },
  ]);
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

  const respond = (text: string): string => {
    const q = text.toLowerCase();
    if (/ola|olá|oi|hey|hello/.test(q)) return 'Olá! Posso falar sobre meus Projetos e Habilidades.';
    if (/projeto|projetos|projectos|portifólio|portfólio/.test(q)) return 'Veja meus projetos na seção "Projetos". Quer um link específico?';
    if (/skill|habilidade|tecnolog/.test(q)) return 'Trabalho com Java (Spring), React e React Native (TypeScript), Python, entre outras.';
    if (/analise|analista|ciencia|cientista|dados/.test(q)) return 'Sou analista e cientista de dados, trabalho com Python, SQL, Power BI e Excel.';
    if (/contato|contacto|email|e-mail|whats/.test(q)) return 'Você pode usar o formulário em "Contato" ou enviar e-mail direto.';
    if (/ajuda|colaboracao|colaborar|uniao|juntar|juncao/.test(q)) return 'Você pode usar o formulário em "Contato" ou enviar e-mail direto para mais detalhes.';
    if (/experien|trabalh|empres/.test(q)) return 'Tenho experiência em backend Java e frontend com React.';
    return 'Obrigado pela pergunta! Já já te retorno por aqui ou me chame em "Conctato".';
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: cryptoId(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const botMsg: ChatMessage = { id: cryptoId(), role: 'bot', content: respond(trimmed) };
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 300);
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
              />
              <button
                onClick={handleSend}
                className="inline-flex items-center justify-center gap-1 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Enviar"
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




