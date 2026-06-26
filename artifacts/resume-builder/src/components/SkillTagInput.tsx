import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface SkillTagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxTags?: number;
}

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "HTML", "CSS", 
  "Tailwind CSS", "SQL", "NoSQL", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes",
  "Git", "REST APIs", "GraphQL", "Agile", "Scrum", "Communication", "Leadership",
  "Project Management", "Figma", "UI/UX Design", "Machine Learning", "Data Analysis", "DevOps"
];

export function SkillTagInput({ value = [], onChange, maxTags = 20 }: SkillTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.trim()) {
      const filtered = COMMON_SKILLS.filter(
        skill => skill.toLowerCase().includes(val.toLowerCase()) && !value.includes(skill)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed) && value.length < maxTags) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="rounded-full hover:bg-primary/20 p-0.5"
              data-testid={`btn-remove-skill-${index}`}
            >
              <X className="w-3 h-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={value.length < maxTags ? "Type a skill and press Enter..." : `Max ${maxTags} skills reached`}
          disabled={value.length >= maxTags}
          className="w-full bg-background"
          data-testid="input-skill-tags"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-md">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => addTag(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground text-right">
        {value.length} / {maxTags} skills
      </div>
    </div>
  );
}
