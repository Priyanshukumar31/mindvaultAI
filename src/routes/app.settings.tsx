import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · MindVault AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Personalize MindVault to your reading style.</p>
      </div>

      <Card className="glass border-white/10 p-6">
        <div className="font-display font-semibold mb-4">Profile</div>
        <div className="flex items-center gap-4">
          <Avatar className="size-16 ring-2 ring-primary/40">
            <AvatarFallback className="bg-grad-primary text-white text-lg font-semibold">MV</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" className="glass border-white/10">Change avatar</Button>
            <div className="text-xs text-muted-foreground mt-1">PNG or JPG · max 2MB</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Field label="Full name" defaultValue="Maya Verma" />
          <Field label="Email" defaultValue="maya@mindvault.ai" />
        </div>
      </Card>

      <Card className="glass border-white/10 p-6">
        <div className="font-display font-semibold mb-4">Appearance & Language</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2 block">Theme</Label>
            <Select defaultValue="dark">
              <SelectTrigger className="bg-card/60 border-white/10"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="system">System</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="bg-card/60 border-white/10"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Español</SelectItem><SelectItem value="fr">Français</SelectItem><SelectItem value="hi">हिन्दी</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="glass border-white/10 p-6">
        <div className="font-display font-semibold mb-4">AI Preferences</div>
        <ToggleRow label="Streaming responses" desc="Show tokens as they arrive from the model." defaultChecked />
        <ToggleRow label="Cite sources" desc="Include chapter and page references in answers." defaultChecked />
        <ToggleRow label="Voice mode" desc="Enable voice input and text-to-speech replies." />
      </Card>

      <Card className="glass border-white/10 p-6">
        <div className="font-display font-semibold mb-4">Notifications</div>
        <ToggleRow label="Reading reminders" desc="Daily nudges to keep your streak alive." defaultChecked />
        <ToggleRow label="Weekly report" desc="Get your weekly learning summary every Sunday." defaultChecked />
        <ToggleRow label="Achievement unlocks" desc="Celebrate when you level up." />
      </Card>

      <Card className="glass border-white/10 p-6">
        <div className="font-display font-semibold mb-4">Privacy</div>
        <ToggleRow label="Private library" desc="Keep uploaded books visible only to you." defaultChecked />
        <ToggleRow label="Share highlights with community" desc="Contribute to the public knowledge feed." />
      </Card>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <Input defaultValue={defaultValue} className="bg-card/60 border-white/10" />
    </div>
  );
}
function ToggleRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
