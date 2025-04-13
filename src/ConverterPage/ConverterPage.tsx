import styled from "styled-components";
import MarkdownRenderer from "../MarkdownRenderer";
import Introduction from "./Sections/Introduction/Introduction.md";
import { TableOfContents } from "./TableOfContents";
import { RectifierSection } from "./Sections/Rectifiers/RectifierSection";
import { useEffect, useState } from "react";
import { ReferenceFrameSection } from "./Sections/Reference Frames/ReferenceFrames";

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

export function ConverterPage() {
    const [activeSection, setActiveSection] = useState<string>("");
    const handleTOCLinkClick = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0, rootMargin: "0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <StyledPageLayout id="converter-page">
            <div></div>
            <TableOfContents
                activeSection={activeSection}
                onTOCLinkClick={handleTOCLinkClick}
            />
            <StyledContent>
                <section id="introduction">
                    <MarkdownRenderer content={Introduction} />
                </section>
                <RectifierSection />
                <ReferenceFrameSection />
            </ StyledContent>
        </ StyledPageLayout>
    );
}

