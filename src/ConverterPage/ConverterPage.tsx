import styled from "styled-components";
import SineCurve from "./MovingSineComponent";
import { MarkdownRenderer } from "../MarkdownRenderer";
import test from "./Text/test.md";

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export function ConverterPage() {
    return (
        <StyledPage>
            <MarkdownRenderer content={test} />
            <SineCurve />
        </StyledPage>
    );
}
