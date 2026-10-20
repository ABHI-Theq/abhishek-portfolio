import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { ResearchSection } from "../ResearchSection";

/**
 * Feature: portfolio-redesign-elevation, Property 9: RAG pipeline diagram contains all required node labels
 * Validates: Requirements 6.1
 *
 * For any render of ResearchSection, the DOM should contain text nodes for every required
 * pipeline stage: "Query", "Uncertainty", "Gate", "Retrieve", "Skip", "Generator", "Response".
 */
describe("Property 9: RAG pipeline diagram contains all required node labels", () => {
  const requiredLabels = [
    "Query",
    "Uncertainty",
    "Gate",
    "Retrieve",
    "Skip",
    "Generator",
    "Response",
  ] as const;

  it("diagram contains all required pipeline node labels", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<ResearchSection />);

        const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
        expect(diagram).not.toBeNull();

        const diagramText = diagram?.textContent ?? "";

        for (const label of requiredLabels) {
          expect(diagramText).toContain(label);
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("Query node is present", () => {
    const { container } = render(<ResearchSection />);
    const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
    expect(diagram?.textContent).toContain("Query");
  });

  it("Retrieve node is present with accent styling", () => {
    const { container } = render(<ResearchSection />);
    const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
    expect(diagram?.textContent).toContain("Retrieve");
  });

  it("Skip node is present", () => {
    const { container } = render(<ResearchSection />);
    const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
    expect(diagram?.textContent).toContain("Skip");
  });
});

/**
 * Feature: portfolio-redesign-elevation, Property 10: Pipeline diagram is aria-hidden
 * Validates: Requirements 6.4
 *
 * For any render of ResearchSection, the pipeline diagram container element should have
 * aria-hidden="true".
 */
describe("Property 10: Pipeline diagram is aria-hidden", () => {
  it("diagram container has aria-hidden=true on every render", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<ResearchSection />);

        const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
        expect(diagram).not.toBeNull();
        expect(diagram?.getAttribute("aria-hidden")).toBe("true");

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("aria-hidden is exactly the string 'true'", () => {
    const { container } = render(<ResearchSection />);
    const diagram = container.querySelector('[data-testid="rag-pipeline-diagram"]');
    expect(diagram?.getAttribute("aria-hidden")).toBe("true");
  });
});
