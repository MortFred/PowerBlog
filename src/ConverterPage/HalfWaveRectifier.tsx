import styled from "styled-components";
import { VoltageSignal } from "./GenerateSignal";
import { SignalPlot } from "./DrawSignal";
import { useEffect, useState } from "react";

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
    if (voltage < 0) {
        return 0;
    }
    return voltage;
}

export function HalfWaveRectifierPlot() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
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
    );
}
