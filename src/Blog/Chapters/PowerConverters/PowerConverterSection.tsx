import styled from "styled-components";
import Introduction from "./Sections/Introduction/Introduction.md";
import { RectifierSection } from "./Sections/Rectifiers/RectifierSection";
import { useEffect, useState } from "react";
import { ReferenceFrameSection } from "./Sections/Reference Frames/ReferenceFrames";
import MarkdownRenderer from "../../../MarkdownRenderer";
import { navigationData } from "../../../HomePage/NavigationTree";

const StyledPageLayout = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-areas: "toc content";
    padding: 32px;
    gap: 32px;
`;

const StyledContent = styled.div`
    grid-area: content;
    display: flex;
    flex-direction: column;
    padding: 16px;
    max-width: 900px;
    overflow-x: auto;
`;

export function PowerConverters() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        // Update the URL hash without scrolling
                        window.history.replaceState(null, "", `#${entry.target.id}`);
                        console.log(`Active section changed to: ${entry.target.id}`);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "0px" }
        );
        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    // Handle initial hash and hash changes
    useEffect(() => {
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveSection(sectionId);
            }
        }
    }, []);

    return (
        <StyledPageLayout id="converter-page">
            <StyledContent>
                <section id={navigationData.Blog.path}>
                    <MarkdownRenderer content={Introduction} />
                </section>
                <RectifierSection />
                <ReferenceFrameSection />
            </StyledContent>
        </StyledPageLayout>
    );
}
