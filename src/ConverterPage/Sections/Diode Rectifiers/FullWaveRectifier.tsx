import styled from "styled-components";
import { VoltageSignal } from "../../GenerateSignal";
import { SignalPlot } from "../../DrawSignal";
import { useEffect, useState } from "react";
import { MarkdownRenderer } from "../../../MarkdownRenderer";
import FullWaveRectifiers from "./Text/Full-wave_rectifier.md";
import FullWaveRectifierFigure1 from "./Figures/full-wave_rectifier_1.svg";
import FullWaveRectifierFigure2 from "./Figures/full-wave_rectifier_2.svg";

const StyledConversionDisplay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    margin: 32px 0;
`;
const StyledPlots = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
`;

const StyledImage = styled.img`
    margin: 16px 16px;
`;

function modifyVoltage(voltage: number) {
    return Math.abs(voltage);
}

export function FullWaveRectifierSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
        <section id="fall-wave-rectifiers">
            <MarkdownRenderer content={FullWaveRectifiers} />
            {parseFloat(Object.keys(rawVoltageSignal)[0]) < 0 ? (
                <StyledImage src={FullWaveRectifierFigure2} alt="Full-wave diode bridge rectifier" width={"400px"} />
            ) : (
                <StyledImage src={FullWaveRectifierFigure1} alt="Full-wave diode bridge rectifier" width={"400px"} />
            )}
            <StyledConversionDisplay>
                <VoltageSignal
                    setVoltage={setRawVoltageSignal}
                    setTime={() => {
                        return;
                    }}
                />
                <StyledPlots>
                    <SignalPlot width={400} signal={rawVoltageSignal} />
                    <SignalPlot width={400} signal={modifiedVoltage} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
