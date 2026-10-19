export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  peak: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "AI Engineer Intern (Prompt Engineering)",
    company: "VaultOfCodes",
    period: "July 2025 – August 2025",
    location: "Remote",
    bullets: [
      "Designed and optimized prompt pipelines for large language model workflows.",
      "Engineered structured prompts to improve output quality, consistency, and task adherence across multiple AI use cases.",
      "Evaluated and iterated on prompt strategies using systematic testing methodologies.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Galgotias University",
    degree: "B.Tech Computer Science and Engineering",
    period: "Aug 2023 – May 2027",
    location: "Greater Noida, India",
    gpa: "9.1/10.0",
    peak: "Peak SGPA 9.78",
  },
];
