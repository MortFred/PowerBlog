import styled from "styled-components";
import { useState } from "react";
import { SignalGenerator } from "../../../Utils/GenerateSignal";
import { SignalPlot } from "../../../Utils/DrawSignal";
import { Chart, registerables } from "chart.js";
import FilterText from "./Text/Output_filters.md";
import { useInView } from "react-intersection-observer";
import MarkdownRenderer from "../../../../../../MarkdownRenderer";

Chart.register(...registerables);

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

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

export function OutputFiltersSection() {
    const [frequency, setFrequency] = useState(0.003);
    const [currentAmplitude, setCurrentAmplitude] = useState(0.5);
    const [R, setR] = useState(0.4);
    const [C, setC] = useState(0.4);
    const [inputCurrentSignal, setInputCurrentSignal] = useState<[number, string]>([0, "black"]);

    const { ref } = useInView({
        threshold: 0,
    });

    function ACCurrentSignal(time: number) {
        return currentAmplitude * Math.sin(time * frequency);
    }

    return (
        <section id="output-filters" ref={ref}>
            <MarkdownRenderer content={FilterText} />

            <StyledConversionDisplay>
                <SignalGenerator
                    setOutput={setInputCurrentSignal}
                    signalFunction={ACCurrentSignal}
                    setTime={() => {}}
                    isPaused={false}
                />
                <div>
                    <StyledSlider>
                        Frequency
                        <input
                            type="range"
                            min="0.0001"
                            max="0.01"
                            step="0.0001"
                            value={frequency}
                            onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                    <StyledSlider>
                        Current Amplitude
                        <input
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.01"
                            value={currentAmplitude}
                            onChange={(e) => setCurrentAmplitude(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                    <StyledSlider>
                        Load Resistance R
                        <input
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.01"
                            value={R}
                            onChange={(e) => setR(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                    <StyledSlider>
                        Filter Capacitance C
                        <input
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.01"
                            value={C}
                            onChange={(e) => setC(parseFloat(e.target.value))}
                        />
                    </StyledSlider>
                </div>
                <StyledPlots>
                    <SignalPlot isPaused={false} width={400} signals={[inputCurrentSignal]} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
