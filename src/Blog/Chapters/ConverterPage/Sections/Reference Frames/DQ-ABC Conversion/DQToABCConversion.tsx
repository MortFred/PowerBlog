import styled from "styled-components";
import { SignalGenerator } from "../../../Utils/GenerateSignal";
import ConversionText from "./DQ_ABC_conversion.md";
import { useEffect, useState } from "react";
import { SignalPlot } from "../../../Utils/DrawSignal";
import InputSliders from "../../../Utils/InputSliders";
import ConverterFigure from "./converter_grid.svg";
import DQToABCCircle from "./DQToABCCircle";
import MarkdownRenderer from "../../../../../../MarkdownRenderer";
// import DQReferenceCircle from "./DQReferenceCircle";

const StyledPlots = styled.div`
    display: flex;
    flex-direction: row;
    gap: 64px;
`;

const StyledImage = styled.img`
    margin: 16px 16px;
`;

export function DQToABCConversionSection() {
    const [gridVoltageSignal, setGridVoltageSignal] = useState<[number, string]>([0, "black"]);
    const [converterVoltageSignal, setConverterVoltageSignal] = useState<[number, string]>([0, "black"]);
    // const [rawVoltageSignalPhaseB, setRawVoltageSignalPhaseB] = useState<[number, string]>([0, "black"]);
    // const [rawVoltageSignalPhaseC, setRawVoltageSignalPhaseC] = useState<[number, string]>([0, "black"]);
    // const [alphaSignal, setAlphaSignal] = useState<[number, string]>([0, "black"]);
    // const [betaSignal, setBetaSignal] = useState<[number, string]>([0, "black"]);
    const [dSignal, setDSignal] = useState<[number, string]>([0, "black"]);
    const [qSignal, setQSignal] = useState<[number, string]>([0, "black"]);
    const [time, setTime] = useState(0);
    const [theta, setTheta] = useState(0);

    const [currentD, setCurrentD] = useState(0.5);
    const [currentQ, setCurrentQ] = useState(0.5);
    const [frequency, setFrequency] = useState(0.1);
    const [voltageAmplitude, setVoltageAmplitude] = useState(0.7);
    const [isPaused, setIsPaused] = useState(false);

    // function ACVoltageSignalPhaseA(time: number) {
    //     return voltageAmplitude * Math.sin(time * frequency * 0.01);
    // }
    // function ACVoltageSignalPhaseB(time: number) {
    //     return voltageAmplitude * Math.sin(time * frequency * 0.01 + (Math.PI * 2) / 3);
    // }
    // function ACVoltageSignalPhaseC(time: number) {
    //     return voltageAmplitude * Math.sin(time * frequency * 0.01 + (Math.PI * 4) / 3);
    // }

    function generateGridVoltageSignal(time: number) {
        return voltageAmplitude * Math.sin(time * frequency * 0.01);
    }
    function generateCurrentDSignal() {
        return currentD;
    }
    function generateCurrentQSignal() {
        return currentQ;
    }

    useEffect(() => {
        const theta = time * frequency * 0.01;
        setConverterVoltageSignal([Math.sin(theta) * currentD + Math.cos(theta) * currentQ, "#06eaff"]);
        setTheta(theta);
    }, [time]);
    // useEffect(() => {
    //     setAlphaSignal([
    //         (2 / 3) * rawVoltageSignalPhaseA[0] -
    //             (1 / 3) * rawVoltageSignalPhaseB[0] -
    //             (1 / 3) * rawVoltageSignalPhaseC[0],
    //         "red",
    //     ]);
    //     setBetaSignal([(1 / Math.sqrt(3)) * (rawVoltageSignalPhaseB[0] - rawVoltageSignalPhaseC[0]), "blue"]);
    // }, [time]);

    // useEffect(() => {
    //     const theta = time * frequency * 0.01;
    //     setDSignal([betaSignal[0] * Math.cos(theta) + alphaSignal[0] * Math.sin(theta), "red"]);
    //     setQSignal([-betaSignal[0] * Math.sin(theta) + alphaSignal[0] * Math.cos(theta), "blue"]);
    //     setTheta(theta);
    // }, [alphaSignal]);

    return (
        <section id="dq-reference">
            <MarkdownRenderer content={ConversionText} />

            <section id="converter-figure">
                <StyledImage src={ConverterFigure} alt="Simplified converter circuit" width={"600px"} />
            </section>
            <div style={{ height: "32px" }} />

            <SignalGenerator
                setOutput={setGridVoltageSignal}
                alternateColors={false}
                signalFunction={generateGridVoltageSignal}
                signalColor="#7d10d6"
                isPaused={isPaused}
                setTime={setTime}
            />
            <SignalGenerator
                setOutput={setDSignal}
                alternateColors={false}
                signalFunction={generateCurrentDSignal}
                signalColor="red"
                isPaused={isPaused}
                setTime={setTime}
            />
            <SignalGenerator
                setOutput={setQSignal}
                alternateColors={false}
                signalFunction={generateCurrentQSignal}
                signalColor="blue"
                isPaused={isPaused}
                setTime={setTime}
            />
            <InputSliders
                sliders={[
                    { name: "Frequency", value: frequency, setValue: setFrequency },
                    { name: "Voltage Amplitude", value: voltageAmplitude, setValue: setVoltageAmplitude },
                    { name: "Direct current (i_d)", value: currentD, setValue: setCurrentD },
                    { name: "Quadrature current (i_q)", value: currentQ, setValue: setCurrentQ, min: -1 },
                ]}
                pauseAnimation={setIsPaused}
            />
            <StyledPlots>
                <DQToABCCircle
                    voltageSignals={[[voltageAmplitude, -theta, "#7d10d6"]]}
                    currentVectors={[dSignal, qSignal]}
                    theta={theta}
                />
                <SignalPlot
                    isPaused={isPaused}
                    signals={[gridVoltageSignal, converterVoltageSignal]}
                    width={400}
                    height={400}
                />
            </StyledPlots>
        </section>
    );
}
