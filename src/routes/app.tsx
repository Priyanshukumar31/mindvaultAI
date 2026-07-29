import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Library, MessageSquareText, Network, Route as RouteIcon,
  Layers3, HelpCircle, Brain, StickyNote, Bookmark, Users, Trophy,
  Settings, Search, Bell, Sparkles, Command, Plus,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/chat", label: "AI Chat", icon: MessageSquareText, badge: "New" },
  { to: "/app/graph", label: "Knowledge Graph", icon: Network },
  { to: "/app/paths", label: "Learning Paths", icon: RouteIcon },
  { to: "/app/flashcards", label: "Flashcards", icon: Layers3 },
  { to: "/app/quizzes", label: "Quizzes", icon: HelpCircle },
  { to: "/app/mindmaps", label: "Mind Maps", icon: Brain },
  { to: "/app/notes", label: "Notes", icon: StickyNote },
  { to: "/app/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/app/community", label: "Community", icon: Users },
  { to: "/app/achievements", label: "Achievements", icon: Trophy },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground bg-grad-soft">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex sticky top-0 h-screen w-[260px] shrink-0 flex-col border-r border-white/5 bg-sidebar/60 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 px-5 py-5">
            <div className="size-9 rounded-xl bg-grad-primary grid place-items-center shadow-glow">
              <Brain className="size-4 text-white" />
            </div>
            <div>
              <div className="font-display font-semibold leading-none">MindVault<span className="text-gradient"> AI</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Second brain</div>
            </div>
          </Link>

          <div className="px-3 pb-3">
            <Button className="w-full bg-grad-primary text-white shadow-glow hover:opacity-95 rounded-xl h-10">
              <Plus className="size-4" /> Upload book
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 space-y-0.5">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/app/dashboard" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    active ? "bg-grad-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <item.icon className="size-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <Badge className="bg-accent/20 text-accent border-0 text-[10px]">{item.badge}</Badge>}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 mx-3 mb-3 glass rounded-xl">
            <div className="flex items-center gap-2 text-xs mb-1">
              <Sparkles className="size-3.5 text-accent" /> <span className="text-muted-foreground">You're on Free</span>
            </div>
            <div className="text-sm font-medium">Upgrade to Pro</div>
            <div className="text-xs text-muted-foreground mt-0.5">Unlock unlimited books & advanced AI.</div>
            <Button size="sm" className="w-full mt-3 bg-grad-primary text-white rounded-lg">Upgrade</Button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 border-b border-white/5 bg-background/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-3">
              <div className="relative flex-1 max-w-xl">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ask MindVault or search your second brain…"
                  className="pl-9 pr-16 h-10 bg-card/60 border-white/10 rounded-xl"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">
                  <Command className="size-3" /> K
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl relative">
                <Bell className="size-4" />
                <span className="absolute top-2 right-2 size-1.5 bg-accent rounded-full" />
              </Button>
              <Avatar className="size-9 ring-2 ring-primary/40">
                <AvatarFallback className="bg-grad-primary text-white text-xs font-semibold">MV</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="p-5 md:p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
