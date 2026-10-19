import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ContactSection } from "../ContactSection";
import { profile } from "@/data/profile";

/**
 * Feature: cinematic-bento-portfolio, Property 11: Contact links have correct href, target, and rel attributes
 * Validates: Requirements 11.1, 11.2
 *
 * For any render of the contact section, all four links (mailto, GitHub, LinkedIn, resume)
 * should be present with correct href values, and all non-mailto links should have
 * target="_blank" and rel="noopener noreferrer".
 */
describe("Property 11: Contact links have correct href, target, and rel attributes", () => {
  it("mailto link has correct href pointing to the profile email", () => {
    const { container } = render(<ContactSection />);

    const mailtoLink = container.querySelector(`a[href="mailto:${profile.email}"]`);
    expect(mailtoLink).not.toBeNull();
  });

  it("GitHub link has correct href", () => {
    const { container } = render(<ContactSection />);

    const githubLink = container.querySelector(`a[href="${profile.github}"]`);
    expect(githubLink).not.toBeNull();
  });

  it("LinkedIn link has correct href", () => {
    const { container } = render(<ContactSection />);

    const linkedinLink = container.querySelector(`a[href="${profile.linkedin}"]`);
    expect(linkedinLink).not.toBeNull();
  });

  it("resume link has correct href", () => {
    const { container } = render(<ContactSection />);

    const resumeLink = container.querySelector(`a[href="${profile.resumeUrl}"]`);
    expect(resumeLink).not.toBeNull();
  });

  it("all non-mailto links have target=_blank and rel=noopener noreferrer", () => {
    const { container } = render(<ContactSection />);

    const allAnchors = Array.from(container.querySelectorAll("a"));
    const externalLinks = allAnchors.filter(
      (a) => !a.getAttribute("href")?.startsWith("mailto:")
    );

    // Must have at least GitHub, LinkedIn, resume
    expect(externalLinks.length).toBeGreaterThanOrEqual(3);

    for (const link of externalLinks) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("all four required links are rendered", () => {
    const { container } = render(<ContactSection />);

    const allAnchors = Array.from(container.querySelectorAll("a"));
    const hrefs = allAnchors.map((a) => a.getAttribute("href") ?? "");

    expect(hrefs).toContain(`mailto:${profile.email}`);
    expect(hrefs).toContain(profile.github);
    expect(hrefs).toContain(profile.linkedin);
    expect(hrefs).toContain(profile.resumeUrl);
  });
});
