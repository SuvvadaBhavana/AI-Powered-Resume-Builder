import { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/EditableField";

interface MinimalTemplateProps {
  data: ResumeData;
  onUpdate: (field: string, value: string) => void;
}

export function MinimalTemplate({ data, onUpdate }: MinimalTemplateProps) {
  const parseList = (text?: string) => text ? text.split("\n").filter(t => t.trim()) : [];
  const projects = parseList(data.projects);
  const education = parseList(data.education);
  const certifications = parseList(data.certifications);

  return (
    <div className="w-full flex flex-col font-sans p-12 lg:p-16 gap-10 bg-white" id="resume-print-content">
      {/* Header Centered */}
      <div className="flex flex-col items-center text-center">
        {data.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border border-black/5 shadow-sm">
            <img src={data.photoUrl} alt={data.fullName || "Profile"} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-medium tracking-tight text-black mb-3">
          <EditableField value={data.fullName || ""} onSave={(v) => onUpdate("fullName", v)} placeholder="Your Name" />
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs tracking-wider text-black/50 uppercase">
          <EditableField value={data.email || ""} onSave={(v) => onUpdate("email", v)} placeholder="email@example.com" />
          <EditableField value={data.phone || ""} onSave={(v) => onUpdate("phone", v)} placeholder="+1 234 567 890" />
          <EditableField value={data.address || ""} onSave={(v) => onUpdate("address", v)} placeholder="City, Country" />
        </div>
      </div>

      {data.careerObjective && (
        <div className="text-sm text-black/70 leading-relaxed text-center max-w-3xl mx-auto px-4">
          <EditableField value={data.careerObjective} onSave={(v) => onUpdate("careerObjective", v)} multiline placeholder="A brief objective..." />
        </div>
      )}

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {projects.length > 0 && (
          <section className="flex flex-col md:flex-row gap-6">
            <div className="w-32 shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 pt-1">
              Experience
            </div>
            <div className="flex-1 flex flex-col gap-6 text-sm text-black/80">
              {projects.map((p, i) => (
                <div key={i} className="leading-relaxed">
                  {p}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="flex flex-col md:flex-row gap-6 border-t border-black/5 pt-10">
            <div className="w-32 shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 pt-1">
              Education
            </div>
            <div className="flex-1 flex flex-col gap-4 text-sm text-black/80">
              {education.map((e, i) => (
                <div key={i} className="leading-relaxed">
                  {e}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="flex flex-col md:flex-row gap-6 border-t border-black/5 pt-10">
            <div className="w-32 shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 pt-1">
              Skills
            </div>
            <div className="flex-1 flex flex-wrap gap-2 text-sm text-black/80">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-black/5 px-2 py-1 rounded text-xs">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="flex flex-col md:flex-row gap-6 border-t border-black/5 pt-10">
            <div className="w-32 shrink-0 text-xs font-semibold uppercase tracking-widest text-black/40 pt-1">
              Certifications
            </div>
            <div className="flex-1 flex flex-col gap-2 text-sm text-black/80">
              {certifications.map((c, i) => (
                <div key={i}>{c}</div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
