import styled from "styled-components";
import { SignalGenerator } from "../../../Utils/GenerateSignal";
import DQReferenceFrameText from "./DQ_reference_frame.md";
import { useEffect, useState } from "react";
import { SignalPlot } from "../../../Utils/DrawSignal";
import InputSliders from "../../../Utils/InputSliders";
import DQReferenceCircle from "./DQReferenceCircle";
import MarkdownRenderer from "../../../../../../MarkdownRenderer";

const StyledPlots = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
`;

export function DQReferenceFrameSection() {
    const [rawVoltageSignalPhaseA, setRawVoltageSignalPhaseA] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseB, setRawVoltageSignalPhaseB] = useState<[number, string]>([0, "black"]);
    const [rawVoltageSignalPhaseC, setRawVoltageSignalPhaseC] = useState<[number, string]>([0, "black"]);
    const [alphaSignal, setAlphaSignal] = useState<[number, string]>([0, "black"]);
    const [betaSignal, setBetaSignal] = useState<[number, string]>([0, "black"]);
    const [dSignal, setDSignal] = useState<[number, string]>([0, "black"]);
    const [qSignal, setQSignal] = useState<[number, string]>([0, "black"]);
    const [isPaused, setIsPaused] = useState(false);
    const [frequency, setFrequency] = useState(0.1);
    const [time, setTime] = useState(0);
    const [theta, setTheta] = useState(0);
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
    }, [time]);

    useEffect(() => {
        const theta = time * frequency * 0.01;
        setDSignal([betaSignal[0] * Math.cos(theta) + alphaSignal[0] * Math.sin(theta), "red"]);
        setQSignal([-betaSignal[0] * Math.sin(theta) + alphaSignal[0] * Math.cos(theta), "blue"]);
        setTheta(theta);
    }, [alphaSignal]);

    return (
        <section id="dq-reference">
            <MarkdownRenderer content={DQReferenceFrameText} />
            <SignalGenerator
                setOutput={setRawVoltageSignalPhaseA}
                alternateColors={false}
                signalFunction={ACVoltageSignalPhaseA}
                signalColor="#FF0000"
                isPaused={isPaused}
                setTime={setTime}
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
                <DQReferenceCircle voltageSignals={[dSignal, qSignal]} theta={theta} />
                <SignalPlot isPaused={isPaused} signals={[dSignal, qSignal]} width={400} />
            </StyledPlots>
        </section>
    );
}
