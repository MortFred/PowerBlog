import React, { useRef, useEffect, useState } from "react";

const SineCurve: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const width = 800;
    const height = 400;
    let animationFrameId: number;
    const [animationSpeed, setAnimationSpeed] = useState(0.05);
    const [currentAmplitude, setCurrentAmplitude] = useState(50);

    let ACCurrentSignal = 0;
    let signalWindow = Array(width).fill(0);
    let signalIndex = 0;

    const drawSineCurve = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + signalWindow[signalIndex]);

        for (let x = 1; x < width; x++) {
            // const index = (signalIndex + x) % width;
            ctx.lineTo(x, height / 2 + signalWindow[x]);
        }

        ctx.strokeStyle = "blue";
        ctx.stroke();
    };

    const animate = (time: number) => {
        ACCurrentSignal = currentAmplitude * Math.sin(time * animationSpeed * 0.05);
        signalWindow[signalIndex] = ACCurrentSignal;
        signalIndex = (signalIndex + 1) % width;

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
    }, [animationSpeed, currentAmplitude]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} style={{ border: "1px solid black" }} />
            <div>
                <label>
                    Animation Speed:
                    <input
                        type="range"
                        min="0.01"
                        max="0.2"
                        step="0.01"
                        value={animationSpeed}
                        onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Voltage Amplitude:
                    <input
                        type="range"
                        min="10"
                        max="150"
                        step="5"
                        value={currentAmplitude}
                        onChange={(e) => setCurrentAmplitude(parseFloat(e.target.value))}
                    />
                </label>
            </div>
        </div>
    );
};

export default SineCurve;
