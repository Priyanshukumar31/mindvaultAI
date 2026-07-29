import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock, Flame, Brain, MessageSquare, Layers3, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · MindVault AI" }, { name: "description", content: "Your learning at a glance." }] }),
  component: Dashboard,
});

const chartData = [
  { d: "Mon", h: 1.2 }, { d: "Tue", h: 2.1 }, { d: "Wed", h: 0.8 },
  { d: "Thu", h: 3.2 }, { d: "Fri", h: 2.4 }, { d: "Sat", h: 4.1 }, { d: "Sun", h: 3.6 },
];

const stats = [
  { icon: BookOpen, label: "Books uploaded", value: "24", trend: "+3", tone: "primary" as const },
  { icon: Clock, label: "Hours learned", value: "128h", trend: "+8h", tone: "accent" as const },
  { icon: Flame, label: "Reading streak", value: "17d", trend: "🔥", tone: "primary" as const },
  { icon: Brain, label: "Knowledge score", value: "842", trend: "+34", tone: "accent" as const },
  { icon: MessageSquare, label: "AI conversations", value: "312", trend: "+22", tone: "primary" as const },
  { icon: Layers3, label: "Flashcards created", value: "1,204", trend: "+96", tone: "accent" as const },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent flex items-center gap-1"><Sparkles className="size-3" /> Welcome back</div>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">Good evening, Maya ✨</h1>
          <p className="text-muted-foreground mt-1">You've read for <span className="text-foreground font-medium">2h 14m</span> today. Keep the streak alive.</p>
        </div>
        <div className="glass rounded-xl px-4 py-2.5 text-sm flex items-center gap-2">
          <Trophy className="size-4 text-accent" /> Level 12 · <span className="text-gradient font-semibold">Scholar</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(s => (
          <Card key={s.label} className="glass border-white/10 p-4 card-hover hover:[&]:card-hover-active">
            <div className={`size-9 rounded-lg grid place-items-center mb-3 ${s.tone === "primary" ? "bg-grad-primary shadow-glow" : "bg-accent/20 text-accent"}`}>
              <s.icon className={`size-4 ${s.tone === "primary" ? "text-white" : ""}`} />
            </div>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-[10px] text-accent mt-1">{s.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass border-white/10 p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display font-semibold flex items-center gap-2"><TrendingUp className="size-4 text-accent" /> Weekly progress</div>
              <div className="text-xs text-muted-foreground">Reading hours over the last 7 days</div>
            </div>
            <div className="text-xs glass rounded-full px-2.5 py-1 text-muted-foreground">This week</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="h" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-white/10 p-5">
          <div className="font-display font-semibold mb-4">Learning goals</div>
          <div className="space-y-4">
            {[
              { g: "Read 4 books this month", v: 62 },
              { g: "300 flashcards mastered", v: 84 },
              { g: "20h AI study time", v: 45 },
              { g: "Complete AI Engineer path", v: 30 },
            ].map(x => (
              <div key={x.g}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{x.g}</span>
                  <span className="text-muted-foreground">{x.v}%</span>
                </div>
                <Progress value={x.v} className="h-2 bg-white/5" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="glass border-white/10 p-5">
          <div className="font-display font-semibold mb-4">Recent activity</div>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Chatted with", b: "Atomic Habits", when: "2m ago" },
              { t: "Generated 12 flashcards from", b: "Deep Work", when: "1h ago" },
              { t: "Completed quiz on", b: "The Pragmatic Programmer", when: "3h ago" },
              { t: "Highlighted 4 passages in", b: "Sapiens", when: "yesterday" },
              { t: "Created mind map for", b: "Thinking, Fast and Slow", when: "yesterday" },
            ].map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-grad-primary/20 grid place-items-center"><Sparkles className="size-3.5 text-accent" /></div>
                <div className="flex-1"><span className="text-muted-foreground">{a.t}</span> <span className="text-foreground font-medium">{a.b}</span></div>
                <span className="text-xs text-muted-foreground">{a.when}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="glass border-white/10 p-5">
          <div className="font-display font-semibold mb-4">Continue reading</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { t: "Atomic Habits", p: 62, c: "#6C63FF" },
              { t: "Deep Work", p: 34, c: "#8B5CF6" },
              { t: "Sapiens", p: 88, c: "#00E5FF" },
            ].map(b => (
              <div key={b.t} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-xl relative overflow-hidden shadow-elegant card-hover group-hover:[&]:card-hover-active"
                  style={{ background: `linear-gradient(135deg, ${b.c}, ${b.c}88), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 60%)` }}>
                  <div className="absolute inset-0 flex items-end p-3">
                    <div>
                      <div className="text-white font-display font-semibold text-sm leading-tight">{b.t}</div>
                      <div className="text-white/70 text-xs">{b.p}% complete</div>
                    </div>
                  </div>
                </div>
                <Progress value={b.p} className="h-1 mt-2 bg-white/5" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
