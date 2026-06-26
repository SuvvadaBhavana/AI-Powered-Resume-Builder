import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeData } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ResumeFormProps {
  defaultValues: ResumeData | null;
  onSubmit: (data: ResumeData) => void;
}

export function ResumeForm({ defaultValues, onSubmit }: ResumeFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: defaultValues || {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      careerObjective: "",
      education: "",
      skills: "",
      projects: "",
      certifications: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Jane Doe" 
                    {...field} 
                    className="bg-background transition-shadow focus-visible:ring-primary focus-visible:ring-offset-2" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Email *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="jane@example.com" 
                    {...field} 
                    className="bg-background transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    {...field} 
                    className="bg-background transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Address / Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="San Francisco, CA" 
                    {...field} 
                    className="bg-background transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 pt-4 border-t border-border">
          <FormField
            control={form.control}
            name="careerObjective"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Career Objective</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe your career goals and what you bring to the table..." 
                    {...field} 
                    className="bg-background min-h-[100px] resize-y transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Education</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="B.Tech Computer Science, XYZ University, 2020–2024" 
                    {...field} 
                    className="bg-background min-h-[100px] resize-y transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Skills</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="React, TypeScript, Node.js (comma separated or one per line)" 
                    {...field} 
                    className="bg-background min-h-[100px] resize-y transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projects"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Projects & Experience</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E-commerce App: Built a full-stack store using Next.js..." 
                    {...field} 
                    className="bg-background min-h-[120px] resize-y transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Certifications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="AWS Certified Developer - Associate" 
                    {...field} 
                    className="bg-background min-h-[100px] resize-y transition-shadow focus-visible:ring-primary" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full text-base font-semibold py-6 rounded-xl hover-elevate shadow-md mt-4 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          Generate Resume ✨
        </Button>
      </form>
    </Form>
  );
}
