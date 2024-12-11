import styled from "styled-components";
import { useEffect, useState } from "react";
import MarkdownRenderer from "../../../../MarkdownRenderer";
import { VoltageSignal } from "../../../GenerateSignal";
import { SignalPlot } from "../../../DrawSignal";
// import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import FilterText from "./Text/Output_filters.md";
import { useInView } from "react-intersection-observer";

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

// function diodeSwitchFunction(voltage: number) {
//     return voltage;
// }

function modifyVoltage(voltage: number) {
    return Math.abs(voltage);
}

// const data = {
//     labels: [10, 15, 20],
//     datasets: [
//         {
//             label: "Voltage over Diode",
//             data: [10, 12, 19],
//             showLine: true,
//             fill: false,
//             pointRadius: 0,
//             stepped: false,
//             tension: 0.2,
//         },
//     ],
// };

// const options = {
//     scales: {
//         y: {
//             title: {
//                 text: "Loss [MW]",
//                 display: true,
//             },
//         },
//         x: {
//             title: {
//                 text: "Production [MW]",
//                 display: true,
//             },
//         },
//     },
//     maintainAspectRatio: true,
// };

export function OutputFiltersSection() {
    const [rawVoltageSignal, setRawVoltageSignal] = useState<Record<number, string>>({ 0: "black" });
    const [modifiedVoltage, setModifiedVoltage] = useState<Record<number, string>>({ 0: "black" });

    const { ref } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        setModifiedVoltage({
            [modifyVoltage(parseFloat(Object.keys(rawVoltageSignal)[0]))]: Object.values(rawVoltageSignal)[0],
        });
    }, [rawVoltageSignal]);

    return (
        <section id="output-filters" ref={ref}>
            <MarkdownRenderer content={FilterText} />
            {/* <div>
                <Line data={data} options={options} />
            </div> */}
            <StyledConversionDisplay>
                <VoltageSignal
                    setVoltage={setRawVoltageSignal}
                    setTime={() => {
                        return;
                    }}
                />
                <StyledPlots>
                    <SignalPlot width={400} signal={rawVoltageSignal} />
                    <SignalPlot width={400} signal={modifiedVoltage} />
                </StyledPlots>
            </StyledConversionDisplay>
        </section>
    );
}
