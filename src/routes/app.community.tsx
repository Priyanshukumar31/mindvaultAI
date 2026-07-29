import { createFileRoute } from "@tanstack/react-router";
import { Users, MessageCircle, Heart, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/community")({
  head: () => ({ meta: [{ title: "Community · MindVault AI" }] }),
  component: CommunityPage,
});

const posts = [
  { u: "Priya S.", h: "PS", t: "Deep Work reading group starting Monday 🚀 Anyone want to join?", tag: "Reading group", likes: 42, comments: 12 },
  { u: "Daniel K.", h: "DK", t: "Just finished DDIA — my mind map is 🔥. Sharing highlights inside.", tag: "Highlights", likes: 89, comments: 24 },
  { u: "Maya L.", h: "ML", t: "How do you all take notes on philosophy books? Sapiens is breaking me.", tag: "Discussion", likes: 31, comments: 47 },
];

function CommunityPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="size-6 text-accent" /> Community</h1>
        <p className="text-muted-foreground mt-1">Read together. Learn faster.</p>
      </div>

      {posts.map((p, i) => (
        <Card key={i} className="glass border-white/10 p-5 card-hover hover:[&]:card-hover-active">
          <div className="flex items-center gap-3">
            <Avatar><AvatarFallback className="bg-grad-primary text-white text-xs">{p.h}</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="font-medium">{p.u}</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <Badge className="bg-accent/20 text-accent border-0">{p.tag}</Badge>
          </div>
          <p className="mt-4">{p.t}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-1.5"><Heart className="size-4" /> {p.likes}</Button>
            <Button variant="ghost" size="sm" className="gap-1.5"><MessageCircle className="size-4" /> {p.comments}</Button>
            <Button variant="ghost" size="sm" className="gap-1.5"><Share2 className="size-4" /> Share</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
