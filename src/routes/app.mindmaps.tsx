import { createFileRoute } from "@tanstack/react-router";
import { Brain, Download, ZoomIn, ZoomOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/mindmaps")({
  head: () => ({ meta: [{ title: "Mind Maps · MindVault AI" }] }),
  component: MindMapsPage,
});

function MindMapsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Brain className="size-6 text-accent" /> Mind Maps</h1>
          <p className="text-muted-foreground mt-1">Interactive AI-generated mind maps.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/10"><ZoomIn className="size-4" /></Button>
          <Button variant="outline" className="glass border-white/10"><ZoomOut className="size-4" /></Button>
          <Button className="bg-grad-primary text-white shadow-glow"><Download className="size-4" /> Export PNG</Button>
        </div>
      </div>

      <Card className="glass border-white/10 p-6 h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-grad-soft opacity-40 pointer-events-none" />
        <svg viewBox="0 0 800 500" className="relative w-full h-full">
          <defs>
            <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6C63FF" /><stop offset="1" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          {/* branches */}
          {[
            [400,250,150,80,"Cue"],
            [400,250,650,80,"Craving"],
            [400,250,150,420,"Response"],
            [400,250,650,420,"Reward"],
            [400,250,700,250,"Identity"],
            [400,250,100,250,"Environment"],
          ].map(([x1,y1,x2,y2,label]:any,i) => (
            <g key={i}>
              <path d={`M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
              <g style={{ animation: `float-slow ${5+i}s ease-in-out infinite` }}>
                <rect x={x2-70} y={y2-18} width="140" height="36" rx="18" fill="rgba(24,24,27,0.8)" stroke="rgba(255,255,255,0.15)" />
                <text x={x2} y={y2+5} textAnchor="middle" fill="white" fontSize="14" fontWeight="600">{label}</text>
              </g>
            </g>
          ))}
          <circle cx="400" cy="250" r="70" fill="url(#mg)" />
          <text x="400" y="245" textAnchor="middle" fill="white" fontSize="15" fontWeight="700">Atomic</text>
          <text x="400" y="265" textAnchor="middle" fill="white" fontSize="15" fontWeight="700">Habits</text>
        </svg>
      </Card>
    </div>
  );
}
