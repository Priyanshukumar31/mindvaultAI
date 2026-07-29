import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Search, Filter, Star, MoreHorizontal, FolderPlus, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/library")({
  head: () => ({ meta: [{ title: "Library · MindVault AI" }, { name: "description", content: "Your books, papers, and notes." }] }),
  component: LibraryPage,
});

const books = [
  { t: "Atomic Habits", a: "James Clear", tag: "Productivity", c: "#6C63FF", p: 62, fav: true },
  { t: "Deep Work", a: "Cal Newport", tag: "Focus", c: "#8B5CF6", p: 34 },
  { t: "Sapiens", a: "Yuval Noah Harari", tag: "History", c: "#00E5FF", p: 88, fav: true },
  { t: "The Pragmatic Programmer", a: "Hunt & Thomas", tag: "Engineering", c: "#7C3AED", p: 100 },
  { t: "Thinking, Fast and Slow", a: "Daniel Kahneman", tag: "Psychology", c: "#22D3EE", p: 12 },
  { t: "Designing Data-Intensive Applications", a: "Kleppmann", tag: "Systems", c: "#A78BFA", p: 45 },
  { t: "Zero to One", a: "Peter Thiel", tag: "Startup", c: "#6366F1", p: 71 },
  { t: "The Almanack of Naval", a: "Eric Jorgenson", tag: "Wisdom", c: "#8B5CF6", p: 100, fav: true },
];

function LibraryPage() {
  const [dragging, setDragging] = useState(false);
  const [q, setQ] = useState("");
  const filtered = books.filter(b => b.t.toLowerCase().includes(q.toLowerCase()) || b.a.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground mt-1">Upload, organize and converse with your knowledge.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/10"><FolderPlus className="size-4" /> New collection</Button>
          <Button className="bg-grad-primary text-white shadow-glow"><Upload className="size-4" /> Upload</Button>
        </div>
      </div>

      {/* Drag/drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={`glass rounded-2xl border-2 border-dashed transition-all p-10 text-center ${
          dragging ? "border-primary shadow-glow bg-primary/5" : "border-white/10"
        }`}
      >
        <div className="mx-auto size-14 rounded-2xl bg-grad-primary grid place-items-center shadow-glow mb-3">
          <Upload className="size-6 text-white" />
        </div>
        <div className="font-display font-semibold text-lg">Drop your books here</div>
        <div className="text-sm text-muted-foreground mt-1">PDF, DOCX, EPUB, TXT · up to 200MB</div>
        <Button className="mt-4 bg-grad-primary text-white shadow-glow">Browse files</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books, authors, tags…" className="pl-9 bg-card/60 border-white/10 h-10 rounded-xl" />
        </div>
        <Tabs defaultValue="all">
          <TabsList className="glass border-white/10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="done">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" className="glass border-white/10"><Filter className="size-4" /> Filter</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(b => (
          <Card key={b.t} className="glass border-white/10 p-3 card-hover hover:[&]:card-hover-active group">
            <div className="aspect-[3/4] rounded-xl relative overflow-hidden mb-3 shadow-elegant"
              style={{ background: `linear-gradient(135deg, ${b.c}, ${b.c}77), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 60%)` }}>
              <div className="absolute top-2 right-2 flex gap-1">
                {b.fav && <div className="size-7 rounded-full glass grid place-items-center"><Star className="size-3.5 text-accent fill-accent" /></div>}
                <button className="size-7 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 transition"><MoreHorizontal className="size-3.5" /></button>
              </div>
              <div className="absolute inset-0 flex items-end p-3">
                <div>
                  <div className="text-white font-display font-semibold text-sm leading-tight">{b.t}</div>
                  <div className="text-white/70 text-[11px] mt-0.5">{b.a}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge className="bg-white/5 border-white/10 text-muted-foreground text-[10px]">{b.tag}</Badge>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1"><BookOpen className="size-3" /> {b.p}%</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
