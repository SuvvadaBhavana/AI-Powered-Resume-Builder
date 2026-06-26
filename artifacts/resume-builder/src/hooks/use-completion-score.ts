import { useMemo } from "react";
import { ResumeData } from "@/lib/types";

export function useCompletionScore(data: ResumeData | null) {
  return useMemo(() => {
    if (!data) return { score: 0, filledFields: [], missingFields: [] };

    const weights: Record<string, number> = {
      fullName: 15,
      email: 15,
      phone: 10,
      address: 5,
      careerObjective: 15,
      education: 15,
      skills: 10,
      projects: 10,
      certifications: 5,
    };

    let score = 0;
    const filledFields: string[] = [];
    const missingFields: string[] = [];

    const isFilled = (key: string, val: any) => {
      if (Array.isArray(val)) return val.length > 0;
      return typeof val === "string" && val.trim().length > 0;
    };

    for (const [key, weight] of Object.entries(weights)) {
      if (isFilled(key, (data as any)[key])) {
        score += weight;
        filledFields.push(key);
      } else {
        missingFields.push(key);
      }
    }

    return { score, filledFields, missingFields };
  }, [data]);
}
