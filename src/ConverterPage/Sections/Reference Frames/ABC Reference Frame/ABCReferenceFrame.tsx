import styled from "styled-components";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import { SignalGenerator } from "../../../GenerateSignal";
import ABCReferenceCircle from "./ABCReferenceCircle";
import ABCReferenceFrameText from "./ABC_reference_frame.md";
import { useState } from "react";
import { SignalPlot } from "../../../DrawSignal";

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

const StyledPlots = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
`;

export function ABCReferenceFrameSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<[number, string]>([0, "black"]);
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(0.5);
    function ACVoltageSignal(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }
    return (
        <section id="abc-reference">
            <MarkdownRenderer content={ABCReferenceFrameText} />
            <SignalGenerator
                setOutput={setRawVoltageSignal}
                alternateColors={false}
                signalFunction={ACVoltageSignal}
                signalColor="#00FF00"
            />
            <div>
                <StyledSlider>
                    Frequency
                    <input
                        type="range"
                        min="0.1"
                        max="0.5"
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
                <ABCReferenceCircle voltageSignal={rawVoltageSignal} />
                <SignalPlot signal={rawVoltageSignal} width={400} />
            </StyledPlots>
        </section>
    );
}
