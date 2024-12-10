import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import arrow from "./Icons/arrow.svg";

const StyledTOC = styled.div`
    grid-area: toc;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: fixed;
    top: 32px;
    left: 32px;
    margin: 16px;
`;

const StyledTOCLinkWithButton = styled.a<{ level: number }>`
    display: grid;
    grid-template-columns: auto 30px;
    gap: 8px;
    align-items: center;
    justify-content: start;
`;

const StyledTOCLink = styled.a<{ level: number }>`
    display: block;
    margin-left: ${({ level }) => level * 8}px;
    color: #07000075;
    text-decoration: none;
`;

const TOCLinkWithButton: React.FC<{
    title: string;
    href: string;
    level: number;
    isExpanded: boolean;
    toggleExpanded: Dispatch<SetStateAction<boolean>>;
}> = ({ title, href, level, isExpanded, toggleExpanded }) => {
    return (
        <StyledTOCLinkWithButton level={0}>
            <StyledTOCLink level={level} href={href} onClick={() => toggleExpanded(true)}>
                {title}
            </StyledTOCLink>
            <img
                onClick={() => toggleExpanded(!isExpanded)}
                src={arrow}
                width={"10px"}
                style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
        </StyledTOCLinkWithButton>
    );
};

export function TableOfContents() {
    const [isRectifierCircuitsExpanded, setRectifierCircuitsExpanded] = useState(false);
    const [isDiodeRectifiersExpanded, setDiodeRectifiersExpanded] = useState(false);

    return (
        <StyledTOC>
            <StyledTOCLink level={0} href="#introduction">
                Introduction
            </StyledTOCLink>
            <TOCLinkWithButton
                title="Rectifier Circuits"
                href="#rectifier-circuits"
                level={1}
                isExpanded={isRectifierCircuitsExpanded}
                toggleExpanded={setRectifierCircuitsExpanded}
            />
            {isRectifierCircuitsExpanded && (
                <>
                    <TOCLinkWithButton
                        title="Diode Rectifiers"
                        href="#diode-rectifiers"
                        level={2}
                        isExpanded={isDiodeRectifiersExpanded}
                        toggleExpanded={setDiodeRectifiersExpanded}
                    />
                    {isDiodeRectifiersExpanded && (
                        <>
                            <StyledTOCLink level={3} href="#half-wave-rectifiers">
                                Half-Wave Rectifiers
                            </StyledTOCLink>
                            <StyledTOCLink level={3} href="#full-wave-rectifiers">
                                Full-Wave Rectifiers
                            </StyledTOCLink>
                        </>
                    )}
                </>
            )}
        </StyledTOC>
    );
}
