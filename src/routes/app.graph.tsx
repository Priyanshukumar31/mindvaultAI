import { createFileRoute } from "@tanstack/react-router";
import { Network, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/graph")({
  head: () => ({ meta: [{ title: "Knowledge Graph · MindVault AI" }] }),
  component: GraphPage,
});

type Node = { id: string; x: number; y: number; r: number; label: string; type: "book"|"concept"|"author" };
const nodes: Node[] = [
  { id: "n1", x: 50, y: 50, r: 34, label: "Habits", type: "concept" },
  { id: "n2", x: 20, y: 25, r: 22, label: "Atomic Habits", type: "book" },
  { id: "n3", x: 80, y: 30, r: 22, label: "Deep Work", type: "book" },
  { id: "n4", x: 78, y: 75, r: 22, label: "Cal Newport", type: "author" },
  { id: "n5", x: 22, y: 78, r: 22, label: "James Clear", type: "author" },
  { id: "n6", x: 50, y: 88, r: 20, label: "Focus", type: "concept" },
  { id: "n7", x: 12, y: 55, r: 18, label: "Identity", type: "concept" },
  { id: "n8", x: 90, y: 55, r: 18, label: "Attention", type: "concept" },
];
const edges: [string,string][] = [
  ["n1","n2"],["n1","n3"],["n2","n5"],["n3","n4"],["n1","n6"],["n1","n7"],["n3","n8"],["n6","n3"],["n2","n7"],
];

const color = (t: Node["type"]) => t === "book" ? "#6C63FF" : t === "author" ? "#00E5FF" : "#8B5CF6";

function GraphPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Network className="size-6 text-accent" /> Knowledge Graph</h1>
          <p className="text-muted-foreground mt-1">Every book, author and concept — interconnected.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <Badge className="bg-primary/20 text-primary border-0">● Books</Badge>
          <Badge className="bg-accent/20 text-accent border-0">● Authors</Badge>
          <Badge className="bg-secondary/40 border-0">● Concepts</Badge>
        </div>
      </div>

      <Card className="glass border-white/10 p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grad-soft opacity-40 pointer-events-none" />
        <svg viewBox="0 0 100 100" className="relative w-full h-[560px]">
          {edges.map(([a,b], i) => {
            const na = nodes.find(n => n.id===a)!;
            const nb = nodes.find(n => n.id===b)!;
            return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.2" />;
          })}
          {nodes.map((n, i) => (
            <g key={n.id} className="cursor-pointer" style={{ animation: `float-slow ${5 + (i % 3)}s ease-in-out infinite`, transformOrigin: `${n.x}px ${n.y}px` }}>
              <circle cx={n.x} cy={n.y} r={n.r / 5} fill={color(n.type)} opacity="0.2" />
              <circle cx={n.x} cy={n.y} r={n.r / 8} fill={color(n.type)} stroke="white" strokeWidth="0.15" />
              <text x={n.x} y={n.y + n.r / 5 + 3} textAnchor="middle" fill="white" fontSize="2.2" fontWeight="600">{n.label}</text>
            </g>
          ))}
        </svg>
        <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="size-3 text-accent" /> AI-clustered · drag to explore
        </div>
      </Card>
    </div>
  );
}
