import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Brain, Send, Sparkles, Mic, Paperclip, Copy, RefreshCw, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Librarian · MindVault AI" }, { name: "description", content: "Chat with your books." }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "ai"; text: string };

const suggestions = [
  "Summarize Chapter 5 of Atomic Habits",
  "Explain habit stacking like I'm 10",
  "Give me 5 interview questions from this book",
  "Compare with Deep Work",
];

const conversations = [
  { t: "Atomic Habits · Ch. 3", w: "2m ago" },
  { t: "Deep Work · summary", w: "1h ago" },
  { t: "Sapiens · quiz", w: "yesterday" },
  { t: "DDIA · replication", w: "2d ago" },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your AI Librarian. Ask me anything about your books — I'll answer with citations from your library." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || streaming) return;
    setMessages(m => [...m, { role: "user", text: t }]);
    setInput("");
    setStreaming(true);

    const reply = mockReply(t);
    setMessages(m => [...m, { role: "ai", text: "" }]);
    let i = 0;
    const iv = setInterval(() => {
      i += 4;
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: reply.slice(0, i) };
        return copy;
      });
      if (i >= reply.length) { clearInterval(iv); setStreaming(false); }
    }, 20);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-5 h-[calc(100vh-8rem)]">
      <aside className="hidden lg:flex flex-col glass rounded-2xl border-white/10 p-3">
        <Button className="bg-grad-primary text-white shadow-glow rounded-xl">+ New chat</Button>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-4 px-2">Recent</div>
        <div className="mt-2 space-y-1 flex-1 overflow-y-auto scrollbar-thin">
          {conversations.map((c, i) => (
            <button key={i} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/5 flex flex-col">
              <span className="truncate">{c.t}</span>
              <span className="text-[10px] text-muted-foreground">{c.w}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex flex-col glass rounded-2xl border-white/10 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
          <div className="size-9 rounded-xl bg-grad-primary grid place-items-center shadow-glow"><Brain className="size-4 text-white" /></div>
          <div className="flex-1">
            <div className="font-display font-semibold">AI Librarian</div>
            <div className="text-xs text-muted-foreground">Connected to <span className="text-accent">Atomic Habits.pdf</span> · 4 more</div>
          </div>
          <Button size="sm" variant="outline" className="glass border-white/10">Multi-doc mode</Button>
        </div>

        <ScrollArea className="flex-1 p-5">
          <div className="max-w-3xl mx-auto space-y-5">
            {messages.map((m, i) => <Message key={i} m={m} />)}
            {messages.length <= 1 && (
              <div className="grid sm:grid-cols-2 gap-2 pt-2">
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} className="text-left glass rounded-xl p-3 text-sm hover:border-primary/40 border-white/10 transition card-hover hover:[&]:card-hover-active">
                    <div className="flex items-center gap-2 text-accent text-xs mb-1"><Sparkles className="size-3" /> Suggestion</div>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-white/5 p-4">
          <div className="max-w-3xl mx-auto glass rounded-2xl border-white/10 p-2 flex items-end gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl"><Paperclip className="size-4" /></Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask about any book in your library…"
              className="flex-1 border-0 bg-transparent resize-none min-h-[44px] max-h-40 focus-visible:ring-0 shadow-none"
            />
            <Button variant="ghost" size="icon" className="rounded-xl"><Mic className="size-4" /></Button>
            <Button onClick={() => send()} disabled={!input.trim() || streaming} className="bg-grad-primary text-white shadow-glow rounded-xl">
              <Send className="size-4" />
            </Button>
          </div>
          <div className="max-w-3xl mx-auto text-[11px] text-muted-foreground text-center mt-2">
            MindVault may generate imperfect answers. Always verify important information.
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ m }: { m: Msg }) {
  const isAi = m.role === "ai";
  return (
    <div className={`flex gap-3 ${isAi ? "" : "flex-row-reverse"}`}>
      <div className={`size-8 shrink-0 rounded-full grid place-items-center ${isAi ? "bg-grad-primary shadow-glow" : "bg-white/10"}`}>
        {isAi ? <Brain className="size-4 text-white" /> : <span className="text-xs">You</span>}
      </div>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isAi ? "glass rounded-tl-sm border-white/10" : "bg-grad-primary text-white rounded-tr-sm shadow-glow"
      }`}>
        <div className="prose-invert whitespace-pre-wrap">{m.text}{isAi && m.text === "" && <span className="inline-block size-2 bg-accent rounded-full animate-pulse" />}</div>
        {isAi && m.text !== "" && (
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="icon" className="size-7"><Copy className="size-3.5" /></Button>
            <Button variant="ghost" size="icon" className="size-7"><RefreshCw className="size-3.5" /></Button>
            <Button variant="ghost" size="icon" className="size-7"><ThumbsUp className="size-3.5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}

function mockReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("chapter") || lower.includes("summar"))
    return `Here's the summary you asked for:

**Key idea:** Small habits compound into remarkable results.

- The 1% rule: getting 1% better every day yields ~37× improvement over a year.
- Four Laws of Behavior Change: make it obvious, attractive, easy, and satisfying.
- Identity over outcomes: focus on becoming the type of person who achieves the goal.

Would you like me to generate 5 flashcards from this section?`;
  if (lower.includes("flashcard"))
    return `Sure — here are 5 flashcards:

1. **Q:** What is the 1% rule? · **A:** Small, consistent improvements compound over time.
2. **Q:** Name the Four Laws of Behavior Change. · **A:** Obvious, Attractive, Easy, Satisfying.
3. **Q:** What is habit stacking? · **A:** Pairing a new habit with an existing routine.
4. **Q:** Why focus on identity? · **A:** Behavior follows self-concept.
5. **Q:** What is environment design? · **A:** Shaping surroundings to make good habits inevitable.`;
  return `Great question. Based on your library, here's what I found:

The concept you're asking about appears across multiple books in your collection. The core insight is that consistent, deliberate practice — combined with focused environment design — outperforms motivation-driven bursts.

Want me to pull related passages from *Deep Work* and *Atomic Habits* side-by-side?`;
}
