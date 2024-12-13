import { useRef, useEffect } from "react";

interface SignalPlotProps {
    width: number;
    signal: [number, string];
}

export function SignalPlot({ width, signal }: SignalPlotProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const height = 400;
    let animationFrameId: number;

    let signalWindow = useRef(Array<[number, string]>(width).fill([0, "blue"]));
    let signalIndex = useRef(0);
    let latestSignalValue = useRef<[number, string]>([0, "blue"]);
    let previousColor = useRef("blue");
    useEffect(() => {
        latestSignalValue.current = signal;
    }, [signal]);

    const drawAxes = (ctx: CanvasRenderingContext2D) => {
        ctx.save();

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
        ctx.translate(20, 20);
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Voltage [V]", 0, 0);
        ctx.restore();
    };

    const drawSineCurve = (ctx: CanvasRenderingContext2D) => {
        let signalValue = signalWindow.current[signalIndex.current][0];
        let signalColor = signalWindow.current[signalIndex.current][1];

        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx);
        ctx.strokeStyle = signalColor;
        ctx.beginPath();
        ctx.moveTo(6, height / 2 - signalValue);

        for (let x = 6; x < width; x++) {
            const index = (signalIndex.current + x) % width;
            let signalValue = signalWindow.current[index][0] * (height / 2 - 50);
            let signalColor = signalWindow.current[index][1];

            ctx.lineTo(x, height / 2 - signalValue);
            if (previousColor.current !== signalColor) {
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, height / 2 - signalValue);
                ctx.strokeStyle = signalColor;
                previousColor.current = signalColor;
            }
        }
        ctx.stroke();
    };

    const animate = () => {
        signalWindow.current[signalIndex.current] = latestSignalValue.current;
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
