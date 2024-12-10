import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import Introduction from "./Sections/Introduction/Introduction.md";
import { HalfWaveRectifierSection } from "./Sections/Diode Rectifiers/HalfWaveRectifier";
import { FullWaveRectifierSection } from "./Sections/Diode Rectifiers/FullWaveRectifier";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 16px;
    max-width: 900px;
`;

const StyledTOC = styled.div`
    margin-bottom: 32px;
`;

const TOCLink = styled.a`
    display: block;
    margin: 8px 0;
    color: blue;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export function ConverterPage() {
    return (
        <StyledContent>
            <StyledTOC>
                <h2>Table of Contents</h2>
                <TOCLink href="#introduction">Introduction</TOCLink>
                <TOCLink href="#half-wave-rectifiers">Half-Wave Rectifiers</TOCLink>
                <TOCLink href="#full-wave-rectifiers">Full-Wave Rectifiers</TOCLink>
            </StyledTOC>
            <section id="introduction">
                <MarkdownRenderer content={Introduction} />
            </section>
            <HalfWaveRectifierSection />
            <FullWaveRectifierSection />
        </StyledContent>
    );
}
