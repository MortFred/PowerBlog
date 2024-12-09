import { useRef, useEffect } from "react";

interface VoltageCurveProps {
    width: number;
    voltage: number;
}

function modifyVoltage(voltage: number) {
    if (voltage > 0) {
        return voltage;
    }
    return 0;
}

export function HalfWaveRectifiedCurve({ width, voltage }: VoltageCurveProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const height = 400;
    let animationFrameId: number;

    let signalWindow = useRef(Array(width).fill(0));
    let signalIndex = useRef(0);
    let voltageSignal = useRef(0);
    useEffect(() => {
        voltageSignal.current = voltage;
    }, [voltage]);

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
            ctx.lineTo(x, height / 2 - signalWindow.current[index]);
        }

        ctx.strokeStyle = "blue";
        ctx.stroke();
    };

    const animate = () => {
        signalWindow.current[signalIndex.current] = modifyVoltage(voltageSignal.current);
        signalIndex.current = (signalIndex.current + 1) % width;

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
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} />
        </div>
    );
}
