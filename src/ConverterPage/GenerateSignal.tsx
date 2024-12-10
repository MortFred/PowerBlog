import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

interface VoltageSignalProps {
    setVoltage: (voltage: Record<number, string>) => void;
    setTime?: (time: number) => void;
    alternateColors?: boolean;
}

export function VoltageSignal({ setVoltage, setTime = () => {}, alternateColors = false }: VoltageSignalProps) {
    let animationFrameId: number;
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(50);
    const ACVoltageSignal = useRef(0);

    const animate = (time: number) => {
        ACVoltageSignal.current = voltageAmplitude * Math.sin(time * frequency * 0.01);
        let color = "blue";
        if (alternateColors) {
            color = ACVoltageSignal.current > 0 ? "blue" : "red";
        }
        setVoltage({ [ACVoltageSignal.current]: color });
        setTime(time);
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [frequency, voltageAmplitude]);

    return (
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
    );
}
