import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function EditableField({ value, onSave, multiline = false, className = "", placeholder = "Click to edit" }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && !isEditing) {
      contentRef.current.innerText = value || "";
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (contentRef.current) {
      const newValue = contentRef.current.innerText;
      if (newValue !== value) {
        onSave(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      contentRef.current?.blur();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`outline-none transition-colors border border-transparent rounded-sm px-1 -mx-1 
          ${isEditing ? 'bg-primary/5 border-primary/20 ring-2 ring-primary/20' : 'hover:bg-black/5 hover:border-black/10'} 
          empty:before:content-[attr(data-placeholder)] empty:before:text-black/30`}
        data-placeholder={placeholder}
        spellCheck={false}
      />
      
      {!isEditing && (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <Pencil className="w-3 h-3 text-black/40" />
        </div>
      )}
    </div>
  );
}
