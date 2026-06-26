import { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/EditableField";

interface ModernTemplateProps {
  data: ResumeData;
  onUpdate: (field: string, value: string) => void;
}

export function ModernTemplate({ data, onUpdate }: ModernTemplateProps) {
  const parseList = (text?: string) => text ? text.split("\n").filter(t => t.trim()) : [];
  const projects = parseList(data.projects);
  const education = parseList(data.education);
  const certifications = parseList(data.certifications);

  return (
    <div className="w-full flex flex-col font-sans bg-white relative" id="resume-print-content">
      {/* Colored Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-primary" />
      
      {/* Header */}
      <div className="pt-12 pb-8 px-10 flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-black/10 bg-black/[0.02]">
        {data.photoUrl ? (
          <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-white">
            <img src={data.photoUrl} alt={data.fullName || "Profile"} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-xl shrink-0 bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            {data.fullName?.charAt(0) || "U"}
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tight text-black mb-2">
            <EditableField value={data.fullName || ""} onSave={(v) => onUpdate("fullName", v)} placeholder="Full Name" />
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-black/60 font-medium mb-4">
            <EditableField value={data.email || ""} onSave={(v) => onUpdate("email", v)} placeholder="Email" />
            <span>•</span>
            <EditableField value={data.phone || ""} onSave={(v) => onUpdate("phone", v)} placeholder="Phone" />
            <span>•</span>
            <EditableField value={data.address || ""} onSave={(v) => onUpdate("address", v)} placeholder="Location" />
          </div>
          {data.careerObjective && (
            <div className="text-sm text-black/80 max-w-2xl leading-relaxed">
              <EditableField value={data.careerObjective} onSave={(v) => onUpdate("careerObjective", v)} multiline placeholder="Objective" />
            </div>
          )}
        </div>
      </div>

      <div className="p-10 flex flex-col gap-8">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary" /> Experience
            </h2>
            <div className="flex flex-col gap-5">
              {projects.map((p, i) => (
                <div key={i} className="text-sm text-black/80 pl-8 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  {p}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-primary" /> Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((e, i) => (
                  <div key={i} className="text-sm text-black/80 border-l-2 border-primary/20 pl-4">
                    {e}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-primary" /> Certifications
              </h2>
              <div className="flex flex-col gap-2 text-sm text-black/80">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
