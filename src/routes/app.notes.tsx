import { createFileRoute } from "@tanstack/react-router";
import { StickyNote, Search, Sparkles, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/notes")({
  head: () => ({ meta: [{ title: "Notes · MindVault AI" }] }),
  component: NotesPage,
});

const notes = [
  { t: "Compound growth beats intensity", b: "Atomic Habits", tags: ["habits","identity"], color: "#6C63FF" },
  { t: "Deep work is a superpower for the 21st century", b: "Deep Work", tags: ["focus","career"], color: "#8B5CF6" },
  { t: "Shared myths let humans cooperate at scale", b: "Sapiens", tags: ["history"], color: "#00E5FF" },
  { t: "Orthogonal design → independent change", b: "The Pragmatic Programmer", tags: ["engineering"], color: "#A78BFA" },
  { t: "System 1 vs System 2 thinking", b: "Thinking, Fast and Slow", tags: ["psychology"], color: "#22D3EE" },
  { t: "Contrarian truths build great startups", b: "Zero to One", tags: ["startup"], color: "#7C3AED" },
];

function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground mt-1">Highlights, notes, and AI expansions across your library.</p>
        </div>
        <Button className="bg-grad-primary text-white shadow-glow"><Sparkles className="size-4" /> Ask AI about my notes</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notes, tags, books…" className="pl-9 bg-card/60 border-white/10 h-10 rounded-xl" />
        </div>
        {["habits","focus","engineering","psychology","history"].map(t => (
          <Badge key={t} className="bg-white/5 border-white/10 text-muted-foreground hover:bg-primary/20 hover:text-primary cursor-pointer"><Tag className="size-3" /> {t}</Badge>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {notes.map((n, i) => (
          <Card key={i} className="glass border-white/10 p-4 break-inside-avoid card-hover hover:[&]:card-hover-active">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg shrink-0 grid place-items-center shadow-glow" style={{ background: `linear-gradient(135deg, ${n.color}, ${n.color}88)` }}>
                <StickyNote className="size-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium leading-snug">{n.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{n.b}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {n.tags.map(t => <Badge key={t} className="bg-white/5 border-white/10 text-[10px] text-muted-foreground">#{t}</Badge>)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
