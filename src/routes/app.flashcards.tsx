import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layers3, Shuffle, Plus, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/flashcards")({
  head: () => ({ meta: [{ title: "Flashcards · MindVault AI" }] }),
  component: FlashcardsPage,
});

const decks = [
  { t: "Atomic Habits", n: 42, d: "Easy", c: "#6C63FF", p: 78 },
  { t: "DDIA · Ch. 5", n: 28, d: "Hard", c: "#8B5CF6", p: 34 },
  { t: "Sapiens", n: 60, d: "Medium", c: "#00E5FF", p: 55 },
  { t: "Deep Work", n: 20, d: "Easy", c: "#A78BFA", p: 92 },
];

const cards = [
  { q: "What is the 1% rule?", a: "Small, consistent improvements compound over time into remarkable results." },
  { q: "Name the Four Laws of Behavior Change.", a: "Make it Obvious · Attractive · Easy · Satisfying." },
  { q: "What is habit stacking?", a: "Pairing a new habit with an existing routine to piggyback on established cues." },
  { q: "Why focus on identity over outcomes?", a: "Behavior follows self-concept — 'I am a runner' beats 'I want to run'." },
];

function FlashcardsPage() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => { setFlipped(false); setIdx(i => (i + 1) % cards.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + cards.length) % cards.length); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <p className="text-muted-foreground mt-1">AI-generated spaced repetition decks.</p>
        </div>
        <Button className="bg-grad-primary text-white shadow-glow"><Sparkles className="size-4" /> Generate deck with AI</Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Study */}
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span>Atomic Habits · Deck</span>
            <span>{idx + 1} / {cards.length}</span>
          </div>

          <div className="[perspective:1200px]">
            <div
              onClick={() => setFlipped(f => !f)}
              className="relative w-full aspect-[16/9] cursor-pointer transition-transform duration-500 [transform-style:preserve-3d]"
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
            >
              <div className="absolute inset-0 glass-strong rounded-2xl grid place-items-center p-8 text-center [backface-visibility:hidden] shadow-elegant">
                <div>
                  <Badge className="bg-primary/20 text-primary border-0 mb-4">Question</Badge>
                  <div className="text-2xl md:text-3xl font-display font-semibold">{cards[idx].q}</div>
                  <div className="text-xs text-muted-foreground mt-6">Click to reveal answer</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl grid place-items-center p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] bg-grad-primary text-white shadow-glow">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-4">Answer</Badge>
                  <div className="text-xl md:text-2xl font-medium">{cards[idx].a}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={prev} className="glass border-white/10"><ChevronLeft className="size-4" /> Prev</Button>
            <div className="flex gap-2">
              <Button variant="outline" className="glass border-white/10">Again</Button>
              <Button variant="outline" className="glass border-white/10">Hard</Button>
              <Button variant="outline" className="glass border-white/10">Good</Button>
              <Button className="bg-grad-primary text-white shadow-glow">Easy</Button>
            </div>
            <Button variant="outline" onClick={next} className="glass border-white/10">Next <ChevronRight className="size-4" /></Button>
          </div>
        </Card>

        {/* Decks */}
        <div className="space-y-3">
          <Card className="glass border-white/10 p-4">
            <div className="text-xs text-muted-foreground">Today</div>
            <div className="mt-1 text-2xl font-display font-bold">42 <span className="text-sm font-normal text-muted-foreground">cards due</span></div>
            <Progress value={38} className="mt-2 h-2 bg-white/5" />
          </Card>
          <div className="font-display font-semibold mt-4">Your decks</div>
          {decks.map(d => (
            <Card key={d.t} className="glass border-white/10 p-3 flex items-center gap-3 card-hover hover:[&]:card-hover-active">
              <div className="size-10 rounded-xl shadow-glow shrink-0" style={{ background: `linear-gradient(135deg, ${d.c}, ${d.c}88)` }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{d.t}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Layers3 className="size-3" /> {d.n} cards · {d.d}
                </div>
                <Progress value={d.p} className="h-1 mt-1.5 bg-white/5" />
              </div>
              <Button variant="ghost" size="icon"><Shuffle className="size-4" /></Button>
            </Card>
          ))}
          <Button variant="outline" className="w-full glass border-white/10 border-dashed"><Plus className="size-4" /> New deck</Button>
        </div>
      </div>
    </div>
  );
}
