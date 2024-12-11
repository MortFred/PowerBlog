import styled from "styled-components";
import { VoltageSignal } from "../../../GenerateSignal";
import { SignalPlot } from "../../../DrawSignal";
import { useEffect, useState } from "react";
import HalfWaveRectifiers from "./Text/Half-wave_rectifier.md";
import HalfWaveRectifierFigure from "./Figures/half_wave_rectifier.svg";
import { useInView } from "react-intersection-observer";
import MarkdownRenderer from "../../../../MarkdownRenderer";

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
    if (voltage < 0) {
        return 0;
    }
    return voltage;
}

export function HalfWaveRectifierSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    const { ref } = useInView({ threshold: 0 });

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
        <section id="half-wave-rectifiers" ref={ref}>
            <MarkdownRenderer content={HalfWaveRectifiers} />
            <StyledImage src={HalfWaveRectifierFigure} alt="Simple rectifier circuit" width={"400px"} />
            <StyledConversionDisplay>
                <VoltageSignal setVoltage={setRawVoltageSignal} alternateColors={true} />
                <StyledPlots>
                    <SignalPlot width={400} signal={rawVoltageSignal} />
                    <SignalPlot width={400} signal={modifiedVoltage} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
