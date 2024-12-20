import styled from "styled-components";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import { SignalGenerator } from "../../../Utils/GenerateSignal";
import AlphaBetaReferenceCircle from "./AlphaBetaReferenceCircle";
import AlphaBetaReferenceFrameText from "./Alpha_beta_reference_frame.md";
import { useEffect, useState } from "react";
import { SignalPlot } from "../../../Utils/DrawSignal";
import InputSliders from "../../../Utils/InputSliders";

const StyledPlots = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
`;

export function AlphaBetaReferenceFrameSection() {
    const [rawVoltageSignalPhaseA, setRawVoltageSignalPhaseA] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseB, setRawVoltageSignalPhaseB] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseC, setRawVoltageSignalPhaseC] = useState<[number, string]>([0, "black"]);
    const [alphaSignal, setAlphaSignal] = useState<[number, string]>([0, "black"]);
    const [betaSignal, setBetaSignal] = useState<[number, string]>([0, "black"]);
    const [isPaused, setIsPaused] = useState(false);
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
        setAlphaSignal([
            (2 / 3) * rawVoltageSignalPhaseA[0] -
                (1 / 3) * rawVoltageSignalPhaseB[0] -
                (1 / 3) * rawVoltageSignalPhaseC[0],
            "red",
        ]);
        setBetaSignal([(1 / Math.sqrt(3)) * (rawVoltageSignalPhaseB[0] - rawVoltageSignalPhaseC[0]), "blue"]);
    }, [rawVoltageSignalPhaseA]);

    return (
        <section id="alpha-beta-reference">
            <MarkdownRenderer content={AlphaBetaReferenceFrameText} />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseA}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseA}
                signalColor="#FF0000"
                isPaused={isPaused}
            />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseB}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseB}
                signalColor="#00FF00"
                isPaused={isPaused}
            />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseC}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseC}
                signalColor="#0000FF"
                isPaused={isPaused}
            />
            <InputSliders
                sliders={[
                    { name: "Frequency", value: frequency, setValue: setFrequency },
                    { name: "Voltage Amplitude", value: voltageAmplitude, setValue: setVoltageAmplitude },
                ]}
                pauseAnimation={setIsPaused}
            />
            <StyledPlots>
                <AlphaBetaReferenceCircle voltageSignals={[alphaSignal, betaSignal]} />
                <SignalPlot isPaused={isPaused} signals={[alphaSignal, betaSignal]} width={400} />
            </StyledPlots>
        </section>
    );
}
