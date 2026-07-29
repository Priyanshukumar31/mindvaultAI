import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/bookmarks")({
  head: () => ({ meta: [{ title: "Bookmarks · MindVault AI" }] }),
  component: BookmarksPage,
});

const items = [
  { q: "You do not rise to the level of your goals. You fall to the level of your systems.", b: "Atomic Habits", p: 27 },
  { q: "The ability to perform deep work is becoming increasingly rare — and increasingly valuable.", b: "Deep Work", p: 14 },
  { q: "Fiction has enabled us not merely to imagine things, but to do so collectively.", b: "Sapiens", p: 42 },
  { q: "Programs must be written for people to read, and only incidentally for machines to execute.", b: "The Pragmatic Programmer", p: 96 },
];

function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Bookmark className="size-6 text-accent" /> Bookmarks & Highlights</h1>
        <p className="text-muted-foreground mt-1">Your favorite passages, curated.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <Card key={i} className="glass border-white/10 p-5 card-hover hover:[&]:card-hover-active">
            <Quote className="size-6 text-accent mb-3" />
            <div className="text-lg font-display leading-snug">"{it.q}"</div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <Badge className="bg-primary/20 text-primary border-0">{it.b}</Badge>
              <span className="text-muted-foreground">Page {it.p}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
