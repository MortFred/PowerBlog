import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import test from "./Text/test.md";
import { useState } from "react";
import { HalfWaveRectifiedCurve } from "./HalfWaveRectifier";
import { VoltageCurve } from "./VoltageSignal";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Ensure the page takes at least the full viewport height */
    padding: 16px; /* Add some padding for better appearance */
`;

const StyledConversionDisplay = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
    justify-content: flex-start;
    align-items: flex-start;
`;

export function ConverterPage() {
    const [inputVoltage, setInputVoltage] = useState(0);
    return (
        <StyledContent>
            <MarkdownRenderer content={test} />
            <StyledConversionDisplay>
                <VoltageCurve width={400} setVoltage={setInputVoltage} />
                <HalfWaveRectifiedCurve width={400} voltage={inputVoltage} />
            </StyledConversionDisplay>
        </StyledContent>
    );
}
