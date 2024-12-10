import styled from "styled-components";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { useEffect, useState } from "react";
import { VoltageCurve } from "./VoltageSignal";

import HalfWaveRectifierFigure from "./Figures/half_wave_rectifier.svg";
// import FullWaveRectifierPositive from "./Figures/full-wave_rectifier_1.svg";
// import FullWaveRectifierNegative from "./Figures/full-wave_rectifier_2.svg";
import Introduction from "./Text/Introduction.md";
import HalfWaveRectifiers from "./Text/Diode Rectifiers/Half-wave_rectifier.md";
import FullWaveRectifiers from "./Text/Diode Rectifiers/Full-wave_rectifier.md";
import { HalfWaveRectifierPlot } from "./HalfWaveRectifier";
// import { FullWaveRectifierCurve } from "./FullWaveRectifier";
// import { VoltageSignal } from "./GenerateSignal";
// import { SignalPlot } from "./DrawSignal";

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
    const [fullWaveInputVoltage, setFullWaveInputVoltage] = useState<Record<number, string>>({ 0: "black" });

    return (
        <StyledContent>
            <MarkdownRenderer content={Introduction} />
            <MarkdownRenderer content={HalfWaveRectifiers} />
            <StyledImage src={HalfWaveRectifierFigure} alt="Simple rectifier circuit" width={"400px"} />
            <HalfWaveRectifierPlot />

            <MarkdownRenderer content={FullWaveRectifiers} />
            {/* {fullWaveInputVoltage > 0 ? (
                <StyledImage src={FullWaveRectifierPositive} alt="Simple rectifier circuit" width={"400px"} />
            ) : (
                <StyledImage src={FullWaveRectifierNegative} alt="Simple rectifier circuit" width={"400px"} />
            )}
            <StyledConversionDisplay> */}
            {/* <VoltageCurve width={400} setVoltage={setFullWaveInputVoltage} fullWave={true} /> */}
            {/* <FullWaveRectifierCurve width={400} voltage={fullWaveInputVoltage} /> */}
            {/* </StyledConversionDisplay> */}
        </StyledContent>
    );
}
