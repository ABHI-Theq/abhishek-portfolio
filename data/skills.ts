export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Material UI"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "Django", "REST APIs", "Prisma", "Nginx"],
  },
  {
    label: "AI & GenAI",
    skills: [
      "LLM Integration",
      "LangChain",
      "RAG",
      "FAISS",
      "embeddings",
      "Prompt Engineering",
      "TensorFlow",
      "OpenCV",
      "Pandas",
    ],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Tools",
    skills: ["Docker", "Git", "Linux", "Postman", "Supabase", "Socket.IO"],
  },
];
