import styled from "styled-components";
import { useEffect, useState } from "react";
import FullWaveRectifiers from "./Text/Full-wave_rectifier.md";
import FullWaveRectifierFigure1 from "./Figures/full-wave_rectifier_1.svg";
import FullWaveRectifierFigure2 from "./Figures/full-wave_rectifier_2.svg";
import { SignalGenerator } from "../../../GenerateSignal";
import { SignalPlot } from "../../../DrawSignal";
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

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

function modifyVoltage(voltage: number) {
    return Math.abs(voltage);
}

export function FullWaveRectifierSection() {
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(50);
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    const { ref } = useInView({ threshold: 0 });

    function ACVoltageSignal(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
        <section id="full-wave-rectifiers" ref={ref}>
            <MarkdownRenderer content={FullWaveRectifiers} />
            {parseFloat(Object.keys(rawVoltageSignal)[0]) < 0 ? (
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
                <div>
                    <StyledSlider>
                        Frequency
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.01"
                            value={frequency}
                            onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                    <StyledSlider>
                        Voltage Amplitude
                        <input
                            type="range"
                            min="10"
                            max="150"
                            step="5"
                            value={voltageAmplitude}
                            onChange={(e) => setVoltageAmplitude(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                </div>
                <StyledPlots>
                    <SignalPlot width={400} signal={rawVoltageSignal} />
                    <SignalPlot width={400} signal={modifiedVoltage} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
