import { useMemo } from "react";
import { ResumeData } from "@/lib/types";

export function useATSScore(data: ResumeData | null) {
  return useMemo(() => {
    if (!data) return { score: 0, feedback: [] };

    let score = 0;
    const feedback: string[] = [];

    // Objective
    if (data.careerObjective?.trim()) {
      score += 10;
      if (data.careerObjective.length > 50) {
        score += 5;
      } else {
        feedback.push("Expand your career objective to be more detailed (>50 chars).");
      }
    } else {
      feedback.push("Add a career objective to outline your goals.");
    }

    // Education
    if (data.education?.trim()) {
      score += 10;
    } else {
      feedback.push("Add your education history.");
    }

    // Skills
    if (data.skills && data.skills.length >= 3) {
      score += 15;
      
      const commonTechWords = ["javascript", "python", "react", "node", "sql", "aws", "git", "agile", "communication", "leadership"];
      const skillsStr = data.skills.join(" ").toLowerCase();
      const hasTechKeyword = commonTechWords.some(word => skillsStr.includes(word));
      
      if (hasTechKeyword) {
        score += 10;
      } else {
        feedback.push("Include common industry keywords in your skills (e.g., specific languages or soft skills).");
      }
    } else {
      feedback.push("Add at least 3 skills to pass ATS keyword filters.");
    }

    // Projects
    if (data.projects?.trim()) {
      score += 15;
      if (/\d/.test(data.projects)) {
        score += 5;
      } else {
        feedback.push("Include numbers or specific metrics in your projects to show impact.");
      }
    } else {
      feedback.push("Add projects or work experience.");
    }

    // Certifications
    if (data.certifications?.trim()) {
      score += 10;
    } else {
      feedback.push("Add certifications if you have any.");
    }

    // Contact & Details
    if (data.phone?.trim()) {
      score += 5;
    } else {
      feedback.push("Add a phone number for recruiters to reach you.");
    }

    if (data.address?.trim()) {
      score += 5;
    } else {
      feedback.push("Add a location/address to pass geographic filters.");
    }

    if (data.fullName?.trim() && data.fullName.includes(" ")) {
      score += 10;
    } else if (!data.fullName?.includes(" ")) {
      feedback.push("Ensure your full name includes both first and last name.");
    }

    return { 
      score: Math.min(100, score), 
      feedback: feedback.slice(0, 3) 
    };
  }, [data]);
}
