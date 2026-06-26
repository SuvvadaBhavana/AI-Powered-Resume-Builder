import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeData } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SkillTagInput } from "@/components/SkillTagInput";
import { User, Mail, Phone, MapPin, Target, GraduationCap, FolderGit2, Award, Camera, CameraIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeFormProps {
  defaultValues: ResumeData;
  onSubmit: (data: ResumeData) => void;
  onChange?: (data: ResumeData) => void;
}

export function ResumeForm({ defaultValues, onSubmit, onChange }: ResumeFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
  });

  // Watch for changes to trigger local storage updates
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (onChange) {
        // cast because react-hook-form partial watch type
        onChange(value as ResumeData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("photoUrl", reader.result as string, { shouldDirty: true, shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const currentPhotoUrl = form.watch("photoUrl");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          
          {/* Photo Section */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handlePhotoUpload}
              />
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center relative">
                {currentPhotoUrl ? (
                  <img src={currentPhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground/50" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <CameraIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <User className="w-4 h-4" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input placeholder="San Francisco, CA" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </motion.div>

          {/* Objective Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <Target className="w-4 h-4" /> Career Objective
            </h3>
            <FormField control={form.control} name="careerObjective" render={({ field }) => (
              <FormItem>
                <FormControl><Textarea placeholder="Briefly describe your career goals..." className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          {/* Education Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>
            <FormField control={form.control} name="education" render={({ field }) => (
              <FormItem>
                <FormControl><Textarea placeholder="B.Tech Computer Science, XYZ University, 2020–2024" className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          {/* Experience Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <FolderGit2 className="w-4 h-4" /> Experience & Projects
            </h3>
            <FormField control={form.control} name="projects" render={({ field }) => (
              <FormItem>
                <FormControl><Textarea placeholder="E-commerce App: Built a full-stack store..." className="min-h-[120px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <Award className="w-4 h-4" /> Skills
            </h3>
            <FormField control={form.control} name="skills" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SkillTagInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          {/* Certifications Card */}
          <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
              <Award className="w-4 h-4" /> Certifications
            </h3>
            <FormField control={form.control} name="certifications" render={({ field }) => (
              <FormItem>
                <FormControl><Textarea placeholder="AWS Certified Developer - Associate" className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" size="lg" className="w-full text-base font-bold py-6 shadow-md transition-all hover:scale-[1.02]">
              Generate Resume
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </Form>
  );
}
