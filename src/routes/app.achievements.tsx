import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Flame, BookOpen, Zap, Brain, Star, Award, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/achievements")({
  head: () => ({ meta: [{ title: "Achievements · MindVault AI" }] }),
  component: AchievementsPage,
});

const badges = [
  { icon: Flame, t: "Streak Master", d: "17-day streak", unlocked: true },
  { icon: BookOpen, t: "Bookworm", d: "Read 10 books", unlocked: true },
  { icon: Brain, t: "Scholar", d: "1000 flashcards", unlocked: true },
  { icon: Zap, t: "Speed Reader", d: "500 pages/week", unlocked: false },
  { icon: Target, t: "Sharpshooter", d: "90% quiz accuracy", unlocked: true },
  { icon: Award, t: "Marathoner", d: "100h learning", unlocked: false },
  { icon: Star, t: "Curator", d: "50 highlights", unlocked: true },
  { icon: Trophy, t: "Champion", d: "Top 10 weekly", unlocked: false },
];

function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Trophy className="size-6 text-accent" /> Achievements</h1>
        <p className="text-muted-foreground mt-1">XP, levels, badges — turn learning into a game.</p>
      </div>

      <Card className="glass-strong border-white/10 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grad-primary opacity-15 animate-gradient-x" />
        <div className="relative flex flex-wrap items-center gap-6">
          <div className="size-20 rounded-2xl bg-grad-primary grid place-items-center shadow-glow">
            <div className="text-3xl font-display font-bold text-white">12</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs uppercase tracking-widest text-accent">Level 12 · Scholar</div>
            <div className="text-2xl font-display font-bold mt-1">4,210 XP</div>
            <div className="text-xs text-muted-foreground mt-1">790 XP until Level 13</div>
            <Progress value={72} className="h-2 mt-2 bg-white/10" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {badges.map(b => (
          <Card key={b.t} className={`glass border-white/10 p-5 text-center card-hover hover:[&]:card-hover-active ${!b.unlocked && "opacity-40 grayscale"}`}>
            <div className={`mx-auto size-14 rounded-2xl grid place-items-center mb-3 ${b.unlocked ? "bg-grad-primary shadow-glow" : "bg-white/5"}`}>
              <b.icon className="size-6 text-white" />
            </div>
            <div className="font-display font-semibold text-sm">{b.t}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{b.d}</div>
            {b.unlocked && <Badge className="mt-3 bg-accent/20 text-accent border-0 text-[10px]">Unlocked</Badge>}
          </Card>
        ))}
      </div>
    </div>
  );
}
