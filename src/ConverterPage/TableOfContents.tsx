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
}> = ({ title, href, level, activeSection, toggleExpanded }) => {
    let isActive = "#" + activeSection === href;
    return (
        <StyledTOCLink level={level} href={href} onClick={() => toggleExpanded(true)} isActive={isActive}>
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
}> = ({ title, href, level, isExpanded, activeSection, toggleExpanded }) => {
    return (
        <StyledTOCLinkWithButton level={0}>
            <TOCLink
                title={title}
                href={href}
                level={level}
                activeSection={activeSection}
                toggleExpanded={toggleExpanded}
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

export function TableOfContents({ activeSection }: { activeSection: string }) {
    const [isRectifierCircuitsExpanded, setRectifierCircuitsExpanded] = useState(false);
    const [isDiodeRectifiersExpanded, setDiodeRectifiersExpanded] = useState(false);

    return (
        <StyledTOC>
            <TOCLink
                title={"Introduction"}
                href={"#introduction"}
                level={0}
                activeSection={activeSection}
                toggleExpanded={() => {}}
            />
            <TOCLinkWithButton
                title="Rectifier Circuits"
                href="#rectifier-circuits"
                level={1}
                isExpanded={isRectifierCircuitsExpanded}
                toggleExpanded={setRectifierCircuitsExpanded}
                activeSection={activeSection}
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
                    />
                    {isDiodeRectifiersExpanded && (
                        <>
                            <TOCLink
                                title={"Half-Wave Rectifiers"}
                                href={"#half-wave-rectifiers"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                            />
                            <TOCLink
                                title={"Full-Wave Rectifiers"}
                                href={"#full-wave-rectifiers"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                            />
                            <TOCLink
                                title={"Diode Switching"}
                                href={"#diode-switching"}
                                level={3}
                                activeSection={activeSection}
                                toggleExpanded={() => {}}
                            />
                        </>
                    )}
                </>
            )}
        </StyledTOC>
    );
}
