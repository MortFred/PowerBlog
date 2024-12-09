import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { useState } from "react";
import { HalfWaveRectifiedCurve } from "./HalfWaveRectifier";
import { VoltageCurve } from "./VoltageSignal";

import HalfWaveRectifier from "./Figures/half_wave_rectifier.svg";
import FullWaveRectifierPositive from "./Figures/full-wave_rectifier_1.svg";
import FullWaveRectifierNegative from "./Figures/full-wave_rectifier_2.svg";
import Introduction from "./Text/Introduction.md";
import HalfWaveRectifiers from "./Text/Half-wave_rectifier.md";
import FullWaveRectifiers from "./Text/Full-wave_rectifier.md";
import { FullWaveRectifierCurve } from "./FullWaveRectifier";

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
    const [halfWaveInputVoltage, setHalfWaveInputVoltage] = useState(0);
    const [fullWaveInputVoltage, setFullWaveInputVoltage] = useState(0);
    return (
        <StyledContent>
            <MarkdownRenderer content={Introduction} />
            <MarkdownRenderer content={HalfWaveRectifiers} />
            <StyledImage src={HalfWaveRectifier} alt="Simple rectifier circuit" width={"400px"} />
            <StyledConversionDisplay>
                <VoltageCurve width={400} setVoltage={setHalfWaveInputVoltage} fullWave={false} />
                <HalfWaveRectifiedCurve width={400} voltage={halfWaveInputVoltage} />
            </StyledConversionDisplay>
            <MarkdownRenderer content={FullWaveRectifiers} />
            {fullWaveInputVoltage > 0 ? (
                <StyledImage src={FullWaveRectifierPositive} alt="Simple rectifier circuit" width={"400px"} />
            ) : (
                <StyledImage src={FullWaveRectifierNegative} alt="Simple rectifier circuit" width={"400px"} />
            )}
            <StyledConversionDisplay>
                <VoltageCurve width={400} setVoltage={setFullWaveInputVoltage} fullWave={true} />
                <FullWaveRectifierCurve width={400} voltage={fullWaveInputVoltage} />
            </StyledConversionDisplay>
        </StyledContent>
    );
}
