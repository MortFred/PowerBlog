import styled from "styled-components";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import { SignalGenerator } from "../../../GenerateSignal";
import ABCReferenceCanvas from "./2DPlane";
import ABCReferenceFrameText from "./ABC_reference_frame.md";
import { useState } from "react";

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

export function ABCReferenceFrameSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(50);
    function ACVoltageSignal(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }
    return (
        <section id="abc-reference">
            <MarkdownRenderer content={ABCReferenceFrameText} />
            <SignalGenerator setOutput={setRawVoltageSignal} alternateColors={true} signalFunction={ACVoltageSignal} />
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
            <ABCReferenceCanvas voltageSignal={rawVoltageSignal} />
        </section>
    );
}
