import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Trophy, Sparkles, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes · MindVault AI" }] }),
  component: QuizzesPage,
});

const questions = [
  { q: "Which principle is central to Chapter 3 of Atomic Habits?", opts: ["The 5 Second Rule", "Four Laws of Behavior Change", "Deliberate Practice", "Deep Work"], correct: 1 },
  { q: "What does DRY stand for?", opts: ["Data-Redundant Yields", "Don't Repeat Yourself", "Dynamic Resource Yield", "Duplicate, Refactor, Yield"], correct: 1 },
  { q: "Sapiens argues that humans dominated Earth due to…", opts: ["Physical strength", "Fire alone", "Shared fictions and cooperation", "Agriculture only"], correct: 2 },
];

const leaderboard = [
  { n: "Alex M.", s: 4820, u: "🥇" },
  { n: "You", s: 4210, u: "🥈" },
  { n: "Priya S.", s: 3960, u: "🥉" },
  { n: "Daniel K.", s: 3120 },
  { n: "Maya L.", s: 2890 },
];

function QuizzesPage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];

  const answer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore(s => s + 100);
  };
  const next = () => { setSelected(null); setIdx(i => (i + 1) % questions.length); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Adaptive AI-generated quizzes with a global leaderboard.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/10">MCQ · T/F · Short · Code</Button>
          <Button className="bg-grad-primary text-white shadow-glow"><Sparkles className="size-4" /> Generate quiz</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between text-xs mb-4">
            <Badge className="bg-primary/20 text-primary border-0">MCQ · Medium</Badge>
            <div className="text-muted-foreground">Question {idx + 1} / {questions.length} · Score <span className="text-accent font-semibold">{score}</span></div>
          </div>
          <Progress value={((idx + (selected !== null ? 1 : 0)) / questions.length) * 100} className="h-1 bg-white/5 mb-6" />
          <div className="text-xl md:text-2xl font-display font-semibold">{q.q}</div>

          <div className="mt-6 grid gap-3">
            {q.opts.map((o, i) => {
              const isCorrect = selected !== null && i === q.correct;
              const isWrong = selected === i && i !== q.correct;
              return (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  className={`text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition ${
                    isCorrect ? "border-accent/60 bg-accent/10" :
                    isWrong ? "border-destructive/60 bg-destructive/10" :
                    "border-white/10 glass hover:border-primary/40"
                  }`}
                >
                  <div className={`size-7 rounded-full grid place-items-center text-xs font-semibold ${
                    isCorrect ? "bg-accent text-accent-foreground" : isWrong ? "bg-destructive text-white" : "bg-white/10"
                  }`}>
                    {isCorrect ? <Check className="size-4" /> : isWrong ? <X className="size-4" /> : String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1">{o}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <Button disabled={selected === null} onClick={next} className="bg-grad-primary text-white shadow-glow">Next question</Button>
          </div>
        </Card>

        <Card className="glass border-white/10 p-5">
          <div className="font-display font-semibold flex items-center gap-2 mb-4"><Trophy className="size-4 text-accent" /> Leaderboard</div>
          <ol className="space-y-2">
            {leaderboard.map((l, i) => (
              <li key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${l.n === "You" ? "bg-grad-primary text-white shadow-glow" : "hover:bg-white/5"}`}>
                <div className="w-6 text-center text-sm">{l.u ?? i + 1}</div>
                <div className="flex-1 text-sm font-medium">{l.n}</div>
                <div className={`text-sm ${l.n === "You" ? "" : "text-muted-foreground"}`}>{l.s.toLocaleString()}</div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
