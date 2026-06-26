import React, { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeData } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

export default function Home() {
  const [stage, setStage] = useState<"form" | "preview">("form");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const handleGenerate = (data: ResumeData) => {
    setResumeData(data);
    setStage("preview");
  };

  const handleEdit = () => {
    setStage("form");
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col font-sans transition-colors duration-200">
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Aero Resume
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 pb-20 relative">
        <AnimatePresence mode="wait">
          {stage === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="text-center mb-10 mt-4 md:mt-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                  Build a sharper resume.
                </h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                  Fill in your details below and generate a clean, modern PDF ready for your next application.
                </p>
              </div>

              <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-sm">
                <ResumeForm defaultValues={resumeData} onSubmit={handleGenerate} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              <ResumePreview data={resumeData!} onEdit={handleEdit} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
