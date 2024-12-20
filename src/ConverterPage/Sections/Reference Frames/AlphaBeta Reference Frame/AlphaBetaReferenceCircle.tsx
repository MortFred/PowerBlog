import React, { useRef, useEffect } from "react";
import { drawArrow, drawCircle, getCenter, sumVectors } from "../ABC Reference Frame/ABCReferenceCircle";

const drawReferenceFrame = (canvasRef: React.RefObject<HTMLCanvasElement>, radius: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const [centerX, centerY] = getCenter(canvas);

    const drawArrowWithLabel = (angle: number, label: string) => {
        drawArrow(canvasRef, angle, radius + 30);
        const labelPosition = 50;
        const endX = centerX + radius * Math.cos(angle);
        const endY = centerY + radius * Math.sin(angle);
        ctx.fillText(label, endX + labelPosition * Math.cos(angle), endY + labelPosition * Math.sin(angle) + 4);
    };

    ctx.font = "16px Avenir";
    ctx.strokeStyle = "Black";
    ctx.fillStyle = "Black";
    drawArrowWithLabel(0, "α");
    drawArrowWithLabel(-Math.PI / 2, "β");
};

interface ReferenceFrameProps {
    voltageSignals: Array<[number, string]>;
}

const ABCReferenceCircle: React.FC<ReferenceFrameProps> = ({ voltageSignals }: ReferenceFrameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let animationFrameId: number;
    const radius = 130;
    const arrowWidth = 3;
    let latestSignalValues = useRef(voltageSignals.map(() => [0, "blue"] as [number, string]));

    useEffect(() => {
        latestSignalValues.current = voltageSignals;
    }, [voltageSignals]);

    const animate = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                let combinedSignalValue: [number, number] = [0, 0];
                drawCircle(canvasRef, radius);
                drawReferenceFrame(canvasRef, radius);
                latestSignalValues.current.map((signal, index) => {
                    let signalValue = signal[0] * radius;
                    let signalColor = signal[1];
                    ctx.strokeStyle = signalColor;
                    ctx.fillStyle = signalColor;
                    drawArrow(canvasRef, index * (Math.PI / 2), signalValue, arrowWidth);
                    combinedSignalValue = sumVectors(combinedSignalValue, [signalValue, index * (Math.PI / 2)]);
                });
                ctx.strokeStyle = "#06eaff";
                ctx.fillStyle = "#06eaff";
                drawArrow(canvasRef, combinedSignalValue[1], combinedSignalValue[0], arrowWidth);
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} width={400} height={400} />;
};

export default ABCReferenceCircle;
