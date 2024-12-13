import styled from "styled-components";
import { SignalGenerator } from "../../../GenerateSignal";
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

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

function modifyVoltage(voltage: number) {
    if (voltage < 0) {
        return 0;
    }
    return voltage;
}

export function HalfWaveRectifierSection() {
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
        <section id="half-wave-rectifiers" ref={ref}>
            <MarkdownRenderer content={HalfWaveRectifiers} />
            <StyledImage src={HalfWaveRectifierFigure} alt="Simple rectifier circuit" width={"400px"} />
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
                            min="0.05"
                            max="1"
                            step="0.01"
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
