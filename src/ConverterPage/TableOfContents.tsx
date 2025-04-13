import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import arrow from "./Icons/arrow.svg";
import React from "react";

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

const StyledTOCLink = styled.a<{ level: number; isActive: boolean }>`
    display: block;
    margin-left: ${({ level }) => level * 8}px;
    color: ${({ isActive }) => (isActive ? "#070000" : "#07000075")};
    text-decoration: none;
`;

const TOCLink: React.FC<{
    title: string;
    href: string;
    level: number;
    activeSection: string;
    toggleExpanded: Dispatch<SetStateAction<boolean>>;
    onTOCLinkClick?: (sectionId: string, level: number) => void;
}> = ({
    title,
    href,
    level,
    activeSection,
    toggleExpanded,
    onTOCLinkClick
}) => {
    let isActive = "#" + activeSection === href;

    const handleClick = () => {
        if (onTOCLinkClick) {
            onTOCLinkClick(href.replace('#', ''), level);
        }
        toggleExpanded(true);
    };
    return (
        <StyledTOCLink
            level={level}
                href={href}
            onClick={handleClick}
            isActive={isActive}
        >
            {title}
        </StyledTOCLink>
    );
};

const TOCLinkWithButton: React.FC<{
    title: string;
    href: string;
    level: number;
    isExpanded: boolean;
    activeSection: string;
    toggleExpanded: Dispatch<SetStateAction<boolean>>;
    onTOCLinkClick?: (sectionId: string, level: number) => void;
}> = ({
    title,
    href,
    level,
    isExpanded,
    activeSection,
    toggleExpanded,
    onTOCLinkClick
}) => {
    return (
        <StyledTOCLinkWithButton level={0}>
            <TOCLink
                title={title}
                href={href}
                level={level}
                activeSection={activeSection}
                toggleExpanded={toggleExpanded}
                onTOCLinkClick={onTOCLinkClick}
            />
            <img
                onClick={() => toggleExpanded(!isExpanded)}
                src={arrow}
                width={"10px"}
                style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
        </StyledTOCLinkWithButton>
    );
};

export function TableOfContents({
    activeSection,
    onTOCLinkClick
}: {
    activeSection: string;
    onTOCLinkClick?: (sectionId: string, level: number) => void;
}) {
    const [isRectifierCircuitsExpanded, setRectifierCircuitsExpanded] = useState(false);
    const [isReferenceFramesExpanded, setReferenceFramesExpanded] = useState(false);
    const [isDiodeRectifiersExpanded, setDiodeRectifiersExpanded] = useState(false);

    return (
        <StyledTOC>
            <TOCLink
                title={"Introduction"}
                href={"#introduction"}
                level={0}
                activeSection={activeSection}
                toggleExpanded={() => {}}
                onTOCLinkClick={onTOCLinkClick}
            />
            <TOCLinkWithButton
                title="Rectifier Circuits"
                href="#rectifier-circuits"
                level={1}
                isExpanded={isRectifierCircuitsExpanded}
                toggleExpanded={setRectifierCircuitsExpanded}
                activeSection={activeSection}
                onTOCLinkClick={onTOCLinkClick}
            />
            {isRectifierCircuitsExpanded && (
                <>
                    <TOCLinkWithButton
                        title="Diode Rectifiers"
                        href="#diode-rectifiers"
                        level={2}
                        isExpanded={isDiodeRectifiersExpanded}
                        toggleExpanded={setDiodeRectifiersExpanded}
                        activeSection={activeSection}
                        onTOCLinkClick={onTOCLinkClick}
                    />
                    {isDiodeRectifiersExpanded && (
                        <React.Fragment>
                            <TOCLink
                                title={"Half-Wave Rectifiers"}
                                href={"#half-wave-rectifiers"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                                onTOCLinkClick={onTOCLinkClick}
                            />
                            <TOCLink
                                title={"Full-Wave Rectifiers"}
                                href={"#full-wave-rectifiers"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                                onTOCLinkClick={onTOCLinkClick}
                            />
                            <TOCLink
                                title={"Output Filter"}
                                href={"#output-filters"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                                onTOCLinkClick={onTOCLinkClick}
                            />
                        </React.Fragment>
                    )}
                </>
            )}
            <TOCLinkWithButton
                title="Reference Frames"
                href="#reference-frames"
                level={1}
                isExpanded={isReferenceFramesExpanded}
                toggleExpanded={setReferenceFramesExpanded}
                activeSection={activeSection}
                onTOCLinkClick={onTOCLinkClick}
            />
            {isReferenceFramesExpanded && (
                <React.Fragment>
                    <TOCLink
                        title={"ABC Reference Frame"}
                        href={"#abc-reference"}
                        level={2}
                        activeSection={activeSection}
                        toggleExpanded={() => {}}
                        onTOCLinkClick={onTOCLinkClick}
                    />
                </React.Fragment>
            )}
        </StyledTOC>
    );
}

