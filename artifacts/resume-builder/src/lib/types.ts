import { z } from "zod";

export const resumeSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid Email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  careerObjective: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
  projects: z.string().optional(),
  certifications: z.string().optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>;
