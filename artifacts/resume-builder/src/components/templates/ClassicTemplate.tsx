import { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/EditableField";

interface ClassicTemplateProps {
  data: ResumeData;
  onUpdate: (field: string, value: string) => void;
}

export function ClassicTemplate({ data, onUpdate }: ClassicTemplateProps) {
  const parseList = (text?: string) => text ? text.split("\n").filter(t => t.trim()) : [];
  const projects = parseList(data.projects);
  const education = parseList(data.education);
  const certifications = parseList(data.certifications);

  return (
    <div className="w-full flex flex-col font-serif" id="resume-print-content">
      {/* Header */}
      <div className="border-b-2 border-black/80 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold uppercase tracking-widest text-black mb-2">
              <EditableField value={data.fullName || ""} onSave={(v) => onUpdate("fullName", v)} placeholder="Full Name" />
            </h1>
            <div className="text-sm text-black/70 font-sans tracking-wide">
              {data.careerObjective ? (
                <EditableField value={data.careerObjective} onSave={(v) => onUpdate("careerObjective", v)} multiline placeholder="Career Objective" />
              ) : (
                <EditableField value="" onSave={(v) => onUpdate("careerObjective", v)} multiline placeholder="Add a career objective..." />
              )}
            </div>
          </div>
          {data.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border border-black/10 shrink-0 ml-6 bg-black/5 flex items-center justify-center">
              <img src={data.photoUrl} alt={data.fullName || "Profile"} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Column (Contact & Skills) */}
        <div className="w-[30%] shrink-0 pr-6 border-r border-black/10 flex flex-col gap-6">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-black/10 pb-1 text-black">Contact</h2>
            <div className="flex flex-col gap-2 text-sm text-black/80 font-sans">
              <EditableField value={data.email || ""} onSave={(v) => onUpdate("email", v)} placeholder="Email Address" />
              <EditableField value={data.phone || ""} onSave={(v) => onUpdate("phone", v)} placeholder="Phone Number" />
              <EditableField value={data.address || ""} onSave={(v) => onUpdate("address", v)} placeholder="Location" />
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-black/10 pb-1 text-black">Skills</h2>
              <div className="flex flex-col gap-1 text-sm text-black/80 font-sans">
                {data.skills.map((skill, i) => (
                  <span key={i} className="py-0.5">{skill}</span>
                ))}
              </div>
            </section>
          )}
          
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-black/10 pb-1 text-black">Certifications</h2>
              <div className="flex flex-col gap-2 text-sm text-black/80 font-sans">
                {certifications.map((cert, i) => (
                  <span key={i} className="py-0.5">{cert}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Experience & Education) */}
        <div className="flex-1 flex flex-col gap-6">
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black/10 pb-1 text-black">Experience & Projects</h2>
              <div className="flex flex-col gap-4 font-sans text-sm text-black/80">
                {projects.map((p, i) => (
                  <div key={i}>
                    {p}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black/10 pb-1 text-black">Education</h2>
              <div className="flex flex-col gap-3 font-sans text-sm text-black/80">
                {education.map((e, i) => (
                  <div key={i}>
                    {e}
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
