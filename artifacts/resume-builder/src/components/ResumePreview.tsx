import React from "react";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  onEdit: () => void;
}

export function ResumePreview({ data, onEdit }: ResumePreviewProps) {
  const handleDownloadPdf = () => {
    window.print();
  };

  const parseTextList = (text?: string) => {
    if (!text) return [];
    if (text.includes(",")) {
      return text.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return text.split("\n").map((s) => s.trim()).filter(Boolean);
  };

  const skills = parseTextList(data.skills);
  const certifications = parseTextList(data.certifications);
  const projects = data.projects?.split("\n").filter((p) => p.trim() !== "") || [];
  const education = data.education?.split("\n").filter((e) => e.trim() !== "") || [];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[210mm] flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sticky top-4 z-20 bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border shadow-sm">
        <Button variant="outline" onClick={onEdit} className="gap-2 shrink-0">
          <ArrowLeft className="w-4 h-4" />
          Edit Resume
        </Button>
        <Button onClick={handleDownloadPdf} className="gap-2 shadow-sm shrink-0">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <div 
        className="w-full max-w-[210mm] bg-white text-black print-content shadow-2xl rounded-sm overflow-hidden transition-all"
        style={{ minHeight: "297mm" }}
      >
        <div id="resume-print-content" className="p-10 md:p-12 lg:p-16 flex flex-col gap-6 font-sans">
          
          {/* Header */}
          <div className="border-b-2 border-black/10 pb-6 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3 uppercase">
              {data.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-black/70 text-sm md:text-base">
              {data.email && (
                <span className="flex items-center gap-1 font-medium text-black/80">
                  {data.email}
                </span>
              )}
              {data.phone && (
                <>
                  <span className="hidden sm:inline opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    {data.phone}
                  </span>
                </>
              )}
              {data.address && (
                <>
                  <span className="hidden sm:inline opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    {data.address}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Objective */}
          {data.careerObjective && (
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-black border-b border-black/10 pb-1">
                Objective
              </h2>
              <p className="text-black/80 text-sm leading-relaxed whitespace-pre-wrap">
                {data.careerObjective}
              </p>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-black border-b border-black/10 pb-1">
                Education
              </h2>
              <div className="flex flex-col gap-2">
                {education.map((item, i) => (
                  <p key={i} className="text-black/80 text-sm leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-black border-b border-black/10 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-black/5 text-black font-medium text-xs rounded-md border border-black/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects & Experience */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-black border-b border-black/10 pb-1">
                Projects & Experience
              </h2>
              <div className="flex flex-col gap-3">
                {projects.map((item, i) => {
                  const parts = item.split(":");
                  if (parts.length > 1) {
                    return (
                      <div key={i} className="text-sm">
                        <span className="font-bold text-black">{parts[0].trim()}:</span>
                        <span className="text-black/80 ml-1 leading-relaxed">{parts.slice(1).join(":").trim()}</span>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-black/80 text-sm leading-relaxed">
                      {item}
                    </p>
                  );
                })}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-black border-b border-black/10 pb-1">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-black/80 text-sm space-y-1 ml-4 marker:text-black/30">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
