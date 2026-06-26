import { ResumeData } from "@/lib/types";

interface TemplateSelectorProps {
  value: ResumeData["template"];
  onChange: (template: ResumeData["template"]) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const templates: { id: ResumeData["template"]; name: string; desc: string }[] = [
    { id: "classic", name: "Classic", desc: "Traditional 2-column layout" },
    { id: "modern", name: "Modern", desc: "Bold header, clean sections" },
    { id: "minimal", name: "Minimal", desc: "Clean single column" }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          onClick={() => onChange(tpl.id)}
          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-left ${
            value === tpl.id 
              ? "border-primary bg-primary/5 shadow-sm" 
              : "border-border bg-card hover:border-primary/40 hover:bg-card/80"
          }`}
          data-testid={`template-${tpl.id}`}
        >
          <div className="w-full aspect-[1/1.2] bg-background border border-border/50 shadow-sm rounded-sm mb-3 relative overflow-hidden flex flex-col">
            {/* Tiny abstract mockups for templates */}
            {tpl.id === "classic" && (
              <div className="flex h-full w-full">
                <div className="w-1/3 bg-muted h-full" />
                <div className="w-2/3 h-full p-1 flex flex-col gap-1">
                  <div className="h-2 bg-primary/20 w-3/4 rounded-full" />
                  <div className="h-1 bg-muted w-full rounded-full" />
                  <div className="h-1 bg-muted w-5/6 rounded-full" />
                </div>
              </div>
            )}
            {tpl.id === "modern" && (
              <div className="flex flex-col h-full w-full">
                <div className="h-1/4 bg-primary w-full" />
                <div className="h-3/4 w-full p-1 flex flex-col gap-1">
                  <div className="h-1 bg-muted w-full rounded-full" />
                  <div className="h-1 bg-muted w-5/6 rounded-full" />
                </div>
              </div>
            )}
            {tpl.id === "minimal" && (
              <div className="flex flex-col h-full w-full p-2 gap-1 items-center">
                <div className="h-2 bg-primary/40 w-1/2 rounded-full mb-1" />
                <div className="h-0.5 bg-border w-full" />
                <div className="h-1 bg-muted w-full rounded-full" />
                <div className="h-1 bg-muted w-5/6 rounded-full" />
              </div>
            )}
          </div>
          <span className="font-semibold text-sm w-full text-center">{tpl.name}</span>
        </button>
      ))}
    </div>
  );
}
