import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import Introduction from "./Text/Introduction.md";
import { useState } from "react";
import { HalfWaveRectifiedCurve } from "./HalfWaveRectifier";
import { VoltageCurve } from "./VoltageSignal";

import BasicRectifier from "./Figures/simple_rectifier.svg";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 16px;
    max-width: 900px;
`;

const StyledConversionDisplay = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 32px 0;
`;

const StyledImage = styled.img`
    margin: 16px 16px; /* Add vertical margin */
`;

export function ConverterPage() {
    const [inputVoltage, setInputVoltage] = useState(0);
    return (
        <StyledContent>
            <MarkdownRenderer content={Introduction} />
            <StyledImage src={BasicRectifier} alt="Simple rectifier circui" width={"400px"} />
            <StyledConversionDisplay>
                <VoltageCurve width={400} setVoltage={setInputVoltage} />
                <HalfWaveRectifiedCurve width={400} voltage={inputVoltage} />
            </StyledConversionDisplay>
        </StyledContent>
    );
}
