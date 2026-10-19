import { describe, it, expect } from "vitest";
import { skillGroups } from "../skills";

/**
 * Feature: cinematic-bento-portfolio, Property 9: Skills data contains all required groups and their skills
 * Validates: Requirements 6.1
 *
 * For any render of the skills section, every required group label (Languages, Frontend,
 * Backend, AI & GenAI, Databases, Tools) should be present, and each group should contain
 * at least the skills specified in Requirement 6.1.
 *
 * Note: This is a data-integrity property over a fixed, statically defined dataset.
 * Property-based testing with random inputs doesn't apply here — the "property" is that
 * the static data file satisfies a universal invariant: all required groups and skills are present.
 */
describe("Skills data integrity — Property 9", () => {
  const REQUIRED_GROUPS: Record<string, string[]> = {
    Languages: ["Java", "Python", "JavaScript", "SQL"],
    Frontend: ["React", "Next.js", "Tailwind CSS"],
    Backend: ["Node.js", "REST APIs", "FastAPI", "Express.js", "Prisma"],
    "AI & GenAI": [
      "LLM Integration",
      "LangChain",
      "RAG",
      "FAISS",
      "embeddings",
      "Prompt Engineering",
    ],
    Databases: ["PostgreSQL", "MongoDB", "Redis"],
    Tools: ["Docker", "Git", "Linux", "Postman", "Supabase"],
  };

  it("contains all 6 required group labels", () => {
    const labels = skillGroups.map((g) => g.label);
    for (const groupLabel of Object.keys(REQUIRED_GROUPS)) {
      expect(labels).toContain(groupLabel);
    }
  });

  it("each group contains all required skills from Requirement 6.1", () => {
    for (const [groupLabel, requiredSkills] of Object.entries(REQUIRED_GROUPS)) {
      const group = skillGroups.find((g) => g.label === groupLabel);
      expect(group, `Group "${groupLabel}" is missing`).toBeDefined();
      for (const skill of requiredSkills) {
        expect(
          group!.skills,
          `Skill "${skill}" missing from group "${groupLabel}"`
        ).toContain(skill);
      }
    }
  });

  it("no group has an empty skills array", () => {
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });
});
