import { useRef, useEffect } from "react";

interface SignalPlotProps {
    width: number;
    signals: Array<[number, string]>;
    isPaused: boolean;
    height?: number;
}

export function SignalPlot({ width, signals, isPaused, height }: SignalPlotProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    height = height ? height : 400;
    let animationFrameId: number;

    let signalWindows = useRef(
        Array.from({ length: signals.length }, () => useRef(Array<[number, string]>(width).fill([0, "blue"])))
    );
    let signalIndex = useRef(0);
    let previousColor = useRef("blue");
    const isPausedRef = useRef(isPaused);

    useEffect(() => {
        signalWindows.current.map((window, index) => {
            window.current[signalIndex.current] = signals[index];
        });
    }, [signals]);

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

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

    const drawSineCurve = (ctx: CanvasRenderingContext2D, signalWindows: Array<Array<[number, string]>>) => {
        ctx.clearRect(0, 0, width, height);
        drawAxes(ctx);
        signalWindows.map((signalWindow) => {
            let signalValue = signalWindow[signalIndex.current][0];
            let signalColor = signalWindow[signalIndex.current][1];

            ctx.strokeStyle = signalColor;
            ctx.beginPath();
            ctx.moveTo(6, height / 2 - signalValue);

            for (let x = 6; x < width; x++) {
                const index = (signalIndex.current + x) % width;
                let signalValue = signalWindow[index][0] * (height / 2 - 80);
                let signalColor = signalWindow[index][1];

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
        });
    };

    const animate = () => {
        if (isPausedRef.current) {
            return;
        }
        signalIndex.current = (signalIndex.current + 1) % width;

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                drawSineCurve(
                    ctx,
                    signalWindows.current.map((window) => window.current)
                );
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} />
        </div>
    );
}
