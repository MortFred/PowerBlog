import styled from "styled-components";
import { useEffect, useState } from "react";
import DiodeSwitchingText from "./Text/Diode_switching.md";
import { MarkdownRenderer } from "../../../../MarkdownRenderer";
import { VoltageSignal } from "../../../GenerateSignal";
import { SignalPlot } from "../../../DrawSignal";

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

function modifyVoltage(voltage: number) {
    return Math.abs(voltage);
}

export function DiodeSwitchingSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
        <section id="diode-switching">
            <MarkdownRenderer content={DiodeSwitchingText} />
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
