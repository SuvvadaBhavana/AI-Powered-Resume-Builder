import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeData } from "@/lib/types";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultData: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  careerObjective: "",
  education: "",
  skills: [],
  projects: "",
  certifications: "",
  photoUrl: "",
  template: "classic",
};

export default function Home() {
  const [stage, setStage] = useState<"form" | "preview">("form");
  const [storedData, setStoredData] = useLocalStorage<ResumeData>("resume_builder_data", defaultData);
  const [currentData, setCurrentData] = useState<ResumeData>(storedData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Notify user if data was loaded from local storage
    if (storedData.fullName || storedData.email) {
      toast({
        title: "Session Restored",
        description: "Your previous resume data has been loaded.",
        duration: 3000,
      });
    }
  }, []);

  // Debounced save to local storage
  useEffect(() => {
    const handler = setTimeout(() => {
      setStoredData(currentData);
    }, 500);
    return () => clearTimeout(handler);
  }, [currentData, setStoredData]);

  const handleFormChange = (data: ResumeData) => {
    setCurrentData(prev => ({ ...prev, ...data }));
  };

  const handleGenerate = (data: ResumeData) => {
    setCurrentData(data);
    setStage("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handlePreviewUpdate = (field: string, value: string) => {
    setCurrentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[100dvh] w-full flex bg-background text-foreground transition-colors overflow-x-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-[100dvh] w-72 bg-sidebar border-r border-border z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Aero Resume</span>
          </div>
          <button className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-md" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <DashboardSidebar data={currentData} />
          
          <div className="p-4 pt-0">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Template</h3>
            <TemplateSelector 
              value={currentData.template || "classic"} 
              onChange={(t) => handleFormChange({ ...currentData, template: t })} 
            />
          </div>
        </div>

        <div className="p-4 border-t border-border flex justify-between items-center bg-sidebar">
          <span className="text-sm text-muted-foreground font-medium">Theme</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-md -ml-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 hidden sm:flex">
              <span className="hover:text-foreground cursor-pointer" onClick={() => setStage("form")}>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className={stage === "form" ? "text-foreground" : "hover:text-foreground cursor-pointer"} onClick={() => setStage("form")}>Builder</span>
              {stage === "preview" && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">Preview</span>
                </>
              )}
            </div>
            <span className="font-bold text-lg sm:hidden">Aero Resume</span>
          </div>

          <div className="flex gap-2">
            {stage === "preview" ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setStage("form")}>
                  Edit Details
                </Button>
                <Button size="sm" onClick={handleDownloadPdf} className="gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setStage("preview")} className="gap-2" disabled={!currentData.fullName}>
                Preview
              </Button>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full pb-20">
          <AnimatePresence mode="wait">
            {stage === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Build your resume</h1>
                  <p className="text-muted-foreground">Fill in your details, select a template, and generate your professional PDF.</p>
                </div>
                <ResumeForm defaultValues={currentData} onChange={handleFormChange} onSubmit={handleGenerate} />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-[210mm] relative">
                  <div className="absolute -top-12 left-0 right-0 flex justify-center text-sm text-muted-foreground bg-accent py-1 px-3 rounded-full w-max mx-auto shadow-sm print:hidden">
                    Click any text in the preview to edit directly
                  </div>
                  <ResumePreview data={currentData} onUpdateData={handlePreviewUpdate} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
