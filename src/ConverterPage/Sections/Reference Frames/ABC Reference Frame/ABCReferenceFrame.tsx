import styled from "styled-components";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import { SignalGenerator } from "../../../GenerateSignal";
import ABCReferenceCircle from "./ABCReferenceCircle";
import ABCReferenceFrameText from "./ABC_reference_frame.md";
import { useEffect, useState } from "react";
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
    const [rawVoltageSignalPhaseA, setRawVoltageSignalPhaseA] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseB, setRawVoltageSignalPhaseB] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseC, setRawVoltageSignalPhaseC] = useState<[number, string]>([0, "black"]);
    const [combinedVoltageSignal, setCombinedVoltageSignal] = useState<[number, string]>([0, "black"]);
    const [frequency, setFrequency] = useState(0.1);
    const [voltageAmplitude, setVoltageAmplitude] = useState(0.7);
    function ACVoltageSignalPhaseA(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }
    function ACVoltageSignalPhaseB(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01 + (Math.PI * 2) / 3);
    }
    function ACVoltageSignalPhaseC(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01 + (Math.PI * 4) / 3);
    }

    useEffect(() => {
        setCombinedVoltageSignal([
            Math.sqrt(rawVoltageSignalPhaseA[0] ** 2 + rawVoltageSignalPhaseB[0] ** 2 + rawVoltageSignalPhaseC[0] ** 2),
            "#06eaff",
        ]);
    }, [rawVoltageSignalPhaseA, rawVoltageSignalPhaseB, rawVoltageSignalPhaseC]);

    return (
        <section id="abc-reference">
            <MarkdownRenderer content={ABCReferenceFrameText} />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseA}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseA}
                signalColor="#FF0000"
            />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseB}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseB}
                signalColor="#00FF00"
            />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseC}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseC}
                signalColor="#0000FF"
            />
            <div>
                <StyledSlider>
                    Frequency
                    <input
                        type="range"
                        min="0.05"
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
                <ABCReferenceCircle
                    voltageSignals={[rawVoltageSignalPhaseA, rawVoltageSignalPhaseB, rawVoltageSignalPhaseC]}
                />
                <SignalPlot
                    signals={[rawVoltageSignalPhaseA, rawVoltageSignalPhaseB, rawVoltageSignalPhaseC]}
                    width={400}
                />
            </StyledPlots>
        </section>
    );
}
