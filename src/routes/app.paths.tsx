import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon, Sparkles, Check, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/paths")({
  head: () => ({ meta: [{ title: "Learning Paths · MindVault AI" }] }),
  component: PathsPage,
});

const path = [
  { t: "Foundations of ML", d: "Week 1-2", books: 2, done: true },
  { t: "Deep Learning Essentials", d: "Week 3-5", books: 3, done: true },
  { t: "Transformers & LLMs", d: "Week 6-8", books: 4, done: false, current: true },
  { t: "Vector DBs & Retrieval", d: "Week 9-10", books: 2, done: false },
  { t: "Production ML Systems", d: "Week 11-12", books: 3, done: false },
  { t: "Capstone project", d: "Week 13", books: 0, done: false },
];

function PathsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><RouteIcon className="size-6 text-accent" /> Learning Paths</h1>
          <p className="text-muted-foreground mt-1">Personalized roadmaps from goal to mastery.</p>
        </div>
      </div>

      <Card className="glass border-white/10 p-5">
        <div className="text-sm text-muted-foreground mb-2">What do you want to become?</div>
        <div className="flex gap-2">
          <Input defaultValue="AI Engineer" className="bg-card/60 border-white/10 h-11" />
          <Button className="bg-grad-primary text-white shadow-glow h-11"><Sparkles className="size-4" /> Generate roadmap</Button>
        </div>
      </Card>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-white/10" />
        <div className="space-y-4">
          {path.map((s, i) => (
            <div key={i} className="relative pl-14">
              <div className={`absolute left-3 top-4 size-6 rounded-full grid place-items-center ${
                s.done ? "bg-accent text-accent-foreground" : s.current ? "bg-grad-primary shadow-glow" : "bg-white/10"
              }`}>
                {s.done ? <Check className="size-3.5" /> : <Circle className="size-2 fill-white text-white" />}
              </div>
              <Card className={`glass border-white/10 p-4 card-hover hover:[&]:card-hover-active ${s.current ? "border-primary/40" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-display font-semibold">{s.t}</div>
                      {s.current && <Badge className="bg-primary/20 text-primary border-0">Current</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.d} · {s.books} books</div>
                  </div>
                  <Button size="sm" variant={s.current ? "default" : "outline"} className={s.current ? "bg-grad-primary text-white shadow-glow" : "glass border-white/10"}>
                    {s.done ? "Review" : s.current ? "Continue" : "Start"}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
