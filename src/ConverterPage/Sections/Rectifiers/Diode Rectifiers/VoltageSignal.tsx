import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;
interface VoltageCurveProps {
    width: number;
    setVoltage: (voltage: number) => void;
    fullWave: boolean;
}

export function VoltageCurve({ width, setVoltage, fullWave }: VoltageCurveProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const height = 400;
    let animationFrameId: number;
    const [frequency, setFrequency] = useState(0.3);
    const [voltageAmplitude, setVoltageAmplitude] = useState(50);

    let ACVoltageSignal = useRef(0);
    let signalWindow = useRef(Array(width).fill(0));
    let signalIndex = useRef(0);
    let positive = useRef(true);

    const drawAxes = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        // x-axis
        ctx.moveTo(6, height / 2);
        ctx.lineTo(width, height / 2);
        // x-axis arrow
        ctx.moveTo(width - 10, height / 2 - 5);
        ctx.lineTo(width, height / 2);
        ctx.lineTo(width - 10, height / 2 + 5);

        // y-axis
        ctx.moveTo(6, 0);
        ctx.lineTo(6, height);
        // y-axis arrow
        ctx.moveTo(6 - 5, 10);
        ctx.lineTo(6, 0);
        ctx.lineTo(6 + 5, 10);

        ctx.strokeStyle = "black";
        ctx.stroke();

        // y-axis label
        ctx.save();
        ctx.translate(20, 20);
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Voltage [V]", 0, 0);
        ctx.restore();
    };

    const drawSineCurve = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx);
        ctx.beginPath();
        ctx.moveTo(6, height / 2 + signalWindow.current[signalIndex.current]);

        for (let x = 6; x < width; x++) {
            const index = (signalIndex.current + x) % width;
            const y = height / 2 - signalWindow.current[index];

            if (fullWave) {
                if (signalWindow.current[index] < 0 && positive.current) {
                    positive.current = false;
                    ctx.strokeStyle = "red";
                    ctx.beginPath();
                } else if (signalWindow.current[index] > 0 && !positive.current) {
                    positive.current = true;
                    ctx.strokeStyle = "blue";
                    ctx.beginPath();
                }
                ctx.moveTo(x, height / 2 - signalWindow.current[index - 1]);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else {
                ctx.lineTo(x, y);
            }
        }
        if (!fullWave) {
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
    };

    const animate = (time: number) => {
        ACVoltageSignal.current = voltageAmplitude * Math.sin(time * frequency * 0.01);
        signalWindow.current[signalIndex.current] = ACVoltageSignal.current;
        signalIndex.current = (signalIndex.current + 1) % width;
        setVoltage(ACVoltageSignal.current);

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                drawSineCurve(ctx);
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [frequency, voltageAmplitude]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} />
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
