import { z } from "zod";

export const resumeSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid Email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  careerObjective: z.string().optional(),
  education: z.string().optional(),
  skills: z.array(z.string()).default([]),
  projects: z.string().optional(),
  certifications: z.string().optional(),
  photoUrl: z.string().optional(),
  template: z.enum(["classic", "modern", "minimal"]).default("classic"),
});

export type ResumeData = z.infer<typeof resumeSchema>;
