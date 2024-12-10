import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import Introduction from "./Sections/Introduction/Introduction.md";
import { TableOfContents } from "./TableOfContents";
import { RectifierSection } from "./Sections/Rectifiers/RectifierSection";

const StyledPageLayout = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
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
    return (
        <StyledPageLayout>
            <div></div>
            <TableOfContents />
            <StyledContent>
                <section id="introduction">
                    <MarkdownRenderer content={Introduction} />
                </section>
                <RectifierSection />
            </StyledContent>
        </StyledPageLayout>
    );
}
