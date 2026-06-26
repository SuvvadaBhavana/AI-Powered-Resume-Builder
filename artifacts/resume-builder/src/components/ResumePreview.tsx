import React from "react";
import { ResumeData } from "@/lib/types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

interface ResumePreviewProps {
  data: ResumeData;
  onUpdateData: (field: string, value: string) => void;
}

export function ResumePreview({ data, onUpdateData }: ResumePreviewProps) {
  return (
    <div className="w-full flex justify-center p-4 md:p-8 bg-black/5 dark:bg-black/20 rounded-xl">
      <div 
        className="w-full max-w-[210mm] bg-white text-black shadow-2xl rounded-sm overflow-hidden"
        style={{ minHeight: "297mm" }}
      >
        {data.template === "modern" && <ModernTemplate data={data} onUpdate={onUpdateData} />}
        {data.template === "minimal" && <MinimalTemplate data={data} onUpdate={onUpdateData} />}
        {data.template === "classic" && <ClassicTemplate data={data} onUpdate={onUpdateData} />}
      </div>
    </div>
  );
}
