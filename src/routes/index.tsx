import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Brain, Sparkles, MessageSquareText, Network, GraduationCap, Layers,
  ArrowRight, Play, Check, Star, BookOpen, Zap, Shield, Globe, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindVault AI — The Future of Reading is Conversation" },
      { name: "description", content: "Upload books. Chat with them. Learn faster than ever with AI-generated summaries, flashcards, quizzes, and mind maps." },
      { property: "og:title", content: "MindVault AI" },
      { property: "og:description", content: "Transform every book into an interactive mentor." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingNav />
      <Hero />
      <Logos />
      <Features />
      <ChatPreview />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className={`transition-all duration-300 flex items-center gap-1 rounded-full px-2 py-2 ${scrolled ? "glass-strong shadow-elegant" : "glass"}`}>
        <Link to="/" className="flex items-center gap-2 px-3">
          <div className="size-8 rounded-lg bg-grad-primary grid place-items-center shadow-glow">
            <Brain className="size-4 text-white" />
          </div>
          <span className="font-display font-semibold tracking-tight">MindVault<span className="text-gradient"> AI</span></span>
        </Link>
        <div className="hidden md:flex items-center text-sm text-muted-foreground">
          <a href="#features" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5">Features</a>
          <a href="#pricing" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5">Pricing</a>
          <a href="#faq" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5">FAQ</a>
        </div>
        <div className="flex items-center gap-2 pl-2">
          <Link to="/app/dashboard" className="hidden sm:inline text-sm px-3 py-1.5 text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/app/dashboard" className="rounded-full bg-grad-primary text-white text-sm px-4 py-1.5 shadow-glow hover:opacity-90 transition">
            Start free
          </Link>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-24 bg-grad-soft">
      {/* animated orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 size-96 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute top-10 right-10 size-72 rounded-full bg-accent/20 blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="mx-auto max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <Sparkles className="size-3.5 text-accent" /> New · AI Librarian v2 with streaming responses
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            The Future of Reading
            <br />
            is <span className="text-gradient animate-gradient-x">Conversation.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload books. Chat with them. Learn faster than ever. MindVault AI turns any PDF, EPUB or note into an intelligent mentor.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app/dashboard">
              <Button size="lg" className="bg-grad-primary text-white shadow-glow rounded-full px-6 h-12 hover:opacity-95">
                Start free <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-6 border-white/15 glass">
              <Play className="mr-1 size-4" /> Watch demo
            </Button>
          </div>
          <div className="mt-6 text-xs text-muted-foreground flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><Check className="size-3 text-accent" /> Free forever plan</span>
            <span className="flex items-center gap-1"><Check className="size-3 text-accent" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="size-3 text-accent" /> Cancel anytime</span>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="mt-16 relative mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="absolute -inset-4 bg-grad-primary opacity-20 blur-2xl rounded-3xl" />
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elegant">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-400/70" />
            <span className="size-3 rounded-full bg-yellow-400/70" />
            <span className="size-3 rounded-full bg-green-400/70" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground">mindvault.ai / library / atomic-habits.pdf</div>
        </div>
        <div className="grid md:grid-cols-[280px_1fr] min-h-[420px]">
          <aside className="hidden md:block border-r border-white/5 p-4 space-y-2 bg-card/40">
            {["Dashboard","Library","AI Chat","Knowledge Graph","Flashcards","Quizzes","Notes"].map((l,i) => (
              <div key={l} className={`px-3 py-2 rounded-lg text-sm ${i===2 ? "bg-grad-primary text-white shadow-glow" : "text-muted-foreground hover:bg-white/5"}`}>{l}</div>
            ))}
          </aside>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-white/10 grid place-items-center text-xs">You</div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">Summarize Chapter 3 and give me 5 flashcards</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-grad-primary grid place-items-center shadow-glow"><Brain className="size-4 text-white" /></div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-xl">
                <div className="text-xs text-accent mb-1">MindVault · Atomic Habits</div>
                Chapter 3 introduces the <span className="text-gradient font-medium">Four Laws of Behavior Change</span>: make it obvious, attractive, easy, and satisfying…
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Cue → Craving","Response → Reward","Habit Stacking","Environment Design"].map(t => (
                    <div key={t} className="text-xs rounded-lg border border-white/10 bg-black/30 px-2.5 py-2">🎴 {t}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="glass rounded-full px-4 py-2.5 text-sm text-muted-foreground flex items-center gap-2">
                <Sparkles className="size-4 text-accent" /> Ask anything about your book…
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logos() {
  const items = ["Stanford","MIT Media Lab","Y Combinator","Notion","Perplexity","Vercel"];
  return (
    <section className="py-12 border-y border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Loved by learners at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {items.map(i => <span key={i} className="font-display text-lg text-muted-foreground">{i}</span>)}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: MessageSquareText, title: "AI Librarian", desc: "Chat with any book like it's the author. Streaming responses with citations." },
    { icon: Layers, title: "Smart Summaries", desc: "30-second, 2-minute, or deep-dive. Choose your depth." },
    { icon: Network, title: "Knowledge Graph", desc: "Every idea, book and author interconnected in a living graph." },
    { icon: GraduationCap, title: "Flashcards & Quizzes", desc: "AI-generated spaced-repetition decks and adaptive quizzes." },
    { icon: BookOpen, title: "Mind Maps", desc: "Beautiful interactive mind maps generated from any chapter." },
    { icon: Brain, title: "Second Brain", desc: "Highlights, notes, chats — searchable across everything you read." },
  ];
  return (
    <section id="features" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Features" title="Everything you need to master any book" desc="A complete AI learning studio built for readers, students, and lifelong learners." />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="group relative glass rounded-2xl p-6 card-hover hover:[&]:card-hover-active">
              <div className="absolute inset-0 rounded-2xl bg-grad-primary opacity-0 group-hover:opacity-10 transition" />
              <div className="relative">
                <div className="size-11 rounded-xl bg-grad-primary grid place-items-center shadow-glow mb-4">
                  <f.icon className="size-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader align="left" eyebrow="AI Librarian" title="Ask anything. Get answers grounded in your books." desc="Streaming responses, markdown, code blocks, tables. Every answer traceable to the source chapter." />
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Explain Chapter 5 like I'm 10",
              "Give me interview questions from this book",
              "Compare with 'Deep Work'",
              "Generate a real-life project idea",
            ].map(x => (
              <li key={x} className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/app/chat">
              <Button className="bg-grad-primary text-white rounded-full shadow-glow">Try the AI Librarian <ArrowRight className="ml-1 size-4" /></Button>
            </Link>
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-4 md:p-6 shadow-elegant">
          <div className="text-xs text-muted-foreground mb-3">Conversation · The Pragmatic Programmer</div>
          <div className="space-y-3 text-sm">
            <Bubble who="you">What's the core message of Chapter 2?</Bubble>
            <Bubble who="ai">
              Chapter 2 focuses on <span className="text-gradient font-medium">"A Pragmatic Approach"</span> — the DRY principle, orthogonality, and reversibility. Highlights:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Every piece of knowledge should have a single, unambiguous representation.</li>
                <li>Design orthogonal systems that change independently.</li>
                <li>Prefer reversible decisions over one-way doors.</li>
              </ul>
            </Bubble>
            <Bubble who="you">Give me a code example of DRY.</Bubble>
            <Bubble who="ai">
              <pre className="bg-black/50 rounded-lg p-3 text-xs overflow-x-auto"><code>{`// ❌ Repeated
const priceUS = base * 1.07;
const priceCA = base * 1.13;

// ✅ DRY
const applyTax = (v, rate) => v * (1 + rate);`}</code></pre>
            </Bubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ who, children }: { who: "you" | "ai"; children: React.ReactNode }) {
  const isAi = who === "ai";
  return (
    <div className={`flex gap-2.5 ${isAi ? "" : "justify-end"}`}>
      {isAi && <div className="size-8 shrink-0 rounded-full bg-grad-primary grid place-items-center shadow-glow"><Brain className="size-4 text-white" /></div>}
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${isAi ? "glass rounded-tl-sm" : "bg-grad-primary text-white rounded-tr-sm"}`}>{children}</div>
      {!isAi && <div className="size-8 shrink-0 rounded-full bg-white/10 grid place-items-center text-xs">Y</div>}
    </div>
  );
}

function Stats() {
  const stats = [
    { k: "50M+", v: "Pages ingested" },
    { k: "1.2M", v: "AI conversations" },
    { k: "120+", v: "Languages" },
    { k: "4.9★", v: "User rating" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass-strong rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-elegant">
          {stats.map(s => (
            <div key={s.v} className="text-center">
              <div className="text-4xl font-display font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "It's like ChatGPT but it actually knows my textbooks.", a: "Priya S.", r: "Med student, AIIMS" },
    { q: "I ship features 2× faster because I can grill my architecture books.", a: "Daniel K.", r: "Senior Engineer" },
    { q: "The Knowledge Graph feels like magic. I finally see the connections.", a: "Maya L.", r: "PhD, Cognitive Science" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Loved by learners" title="What people are saying" />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {items.map(t => (
            <div key={t.a} className="glass rounded-2xl p-6 card-hover hover:[&]:card-hover-active">
              <div className="flex gap-0.5 text-accent mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current" />)}</div>
              <p className="text-sm leading-relaxed">"{t.q}"</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="font-medium text-foreground">{t.a}</div>
                {t.r}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Free", price: "$0", desc: "For curious minds.", features: ["3 books","Basic AI chat","Flashcards","Community"], cta: "Get started" },
    { name: "Pro", price: "$12", desc: "Serious learners.", features: ["Unlimited books","Advanced AI + streaming","Mind maps & Knowledge Graph","Quiz generator","Priority support"], cta: "Start Pro", featured: true },
    { name: "Teams", price: "$29", desc: "Study together.", features: ["Everything in Pro","Shared collections","Team leaderboards","Admin analytics","SSO"], cta: "Contact sales" },
  ];
  return (
    <section id="pricing" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Pricing" title="Simple, transparent pricing" desc="Start free. Upgrade when you outgrow your bookshelf." />
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {tiers.map(t => (
            <div key={t.name} className={`relative rounded-2xl p-6 card-hover hover:[&]:card-hover-active ${t.featured ? "glass-strong shadow-glow border-primary/30" : "glass"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-grad-primary text-white px-2.5 py-0.5 rounded-full shadow-glow">Most popular</div>}
              <div className="font-display font-semibold">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-2"><Check className="size-4 text-accent" /> {f}</li>
                ))}
              </ul>
              <Link to="/app/dashboard" className={`mt-6 inline-flex w-full items-center justify-center rounded-full h-10 text-sm font-medium ${t.featured ? "bg-grad-primary text-white shadow-glow" : "border border-white/10 hover:bg-white/5"}`}>
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "Which file formats can I upload?", a: "PDF, DOCX, EPUB, and TXT — up to 200MB per document. More formats coming soon." },
    { q: "How does the AI stay accurate to my book?", a: "We chunk and embed your document into a vector index. Every answer is retrieved from your book with citations." },
    { q: "Is my data private?", a: "Yes. Your uploads are encrypted at rest, private to your account, and never used to train foundation models." },
    { q: "Can I export my notes and flashcards?", a: "Export any note, deck, mind map or summary to PDF, Markdown or JSON." },
    { q: "Do you support other languages?", a: "MindVault supports 120+ languages for both reading and AI conversation." },
  ];
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title="Frequently asked" />
        <Accordion type="single" collapsible className="mt-10">
          {qs.map((q, i) => (
            <AccordionItem key={i} value={String(i)} className="glass rounded-xl px-4 mb-2 border-white/10">
              <AccordionTrigger className="text-left hover:no-underline">{q.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{q.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-12 text-center shadow-elegant">
          <div className="absolute inset-0 bg-grad-primary opacity-20 animate-gradient-x" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold">Your library, finally sentient.</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Join thousands of learners turning static pages into interactive mentors.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/app/dashboard">
                <Button size="lg" className="bg-grad-primary text-white rounded-full shadow-glow h-12 px-6 hover:opacity-95">
                  Start free <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-6 glass border-white/15">
                Book a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-grad-primary grid place-items-center shadow-glow">
              <Brain className="size-4 text-white" />
            </div>
            <span className="font-display font-semibold">MindVault<span className="text-gradient"> AI</span></span>
          </div>
          <p className="mt-3 text-muted-foreground">Transform every book into an interactive mentor.</p>
        </div>
        {[
          { t:"Product", l:["Features","Pricing","Changelog","Roadmap"] },
          { t:"Company", l:["About","Blog","Careers","Press"] },
          { t:"Legal", l:["Privacy","Terms","Security","DPA"] },
        ].map(c => (
          <div key={c.t}>
            <div className="font-medium mb-3">{c.t}</div>
            <ul className="space-y-2 text-muted-foreground">
              {c.l.map(x => <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 mt-10 flex flex-wrap justify-between items-center text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} MindVault AI. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Shield className="size-3" /> SOC 2</span>
          <span className="flex items-center gap-1"><Globe className="size-3" /> 120+ languages</span>
          <span className="flex items-center gap-1"><Zap className="size-3" /> Powered by AI</span>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, desc, align = "center" }: { eyebrow?: string; title: string; desc?: string; align?: "center" | "left" }) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${a} max-w-2xl`}>
      {eyebrow && <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent mb-3"><Sparkles className="size-3" /> {eyebrow}</div>}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}
