import styled from "styled-components";
import { useEffect, useState } from "react";
import FullWaveRectifiers from "./Text/Full-wave_rectifier.md";
import FullWaveRectifierFigure1 from "./Figures/full-wave_rectifier_1.svg";
import FullWaveRectifierFigure2 from "./Figures/full-wave_rectifier_2.svg";
import { SignalGenerator } from "../../../GenerateSignal";
import { SignalPlot } from "../../../DrawSignal";
import { useInView } from "react-intersection-observer";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import InputSliders from "../../../InputSliders";

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
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(0.5);
    const [rawVoltageSignal, setRawVoltageSignal] = useState<[number, string]>([0, "black"]);
    const [modifiedVoltage, setModifiedVoltage] = useState<[number, string]>([0, "black"]);

    const { ref } = useInView({ threshold: 0 });

    function ACVoltageSignal(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }

    useEffect(() => {
        setModifiedVoltage([modifyVoltage(rawVoltageSignal[0]), rawVoltageSignal[1]]);
    }, [rawVoltageSignal]);

    return (
        <section id="full-wave-rectifiers" ref={ref}>
            <MarkdownRenderer content={FullWaveRectifiers} />
            {rawVoltageSignal[0] < 0 ? (
                <StyledImage src={FullWaveRectifierFigure2} alt="Full-wave diode bridge rectifier" width={"400px"} />
            ) : (
                <StyledImage src={FullWaveRectifierFigure1} alt="Full-wave diode bridge rectifier" width={"400px"} />
            )}
            <StyledConversionDisplay>
                <SignalGenerator
                    setOutput={setRawVoltageSignal}
                    alternateColors={true}
                    signalFunction={ACVoltageSignal}
                />
                <InputSliders
                    sliders={[
                        { name: "Frequency", value: frequency, setValue: setFrequency },
                        { name: "Voltage Amplitude", value: voltageAmplitude, setValue: setVoltageAmplitude },
                    ]}
                />
                <StyledPlots>
                    <SignalPlot width={400} signals={[rawVoltageSignal]} />
                    <SignalPlot width={400} signals={[modifiedVoltage]} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
