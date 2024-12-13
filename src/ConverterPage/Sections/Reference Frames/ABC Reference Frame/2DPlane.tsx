import React, { useRef, useEffect } from "react";

const getCenter = (canvas: HTMLCanvasElement) => {
    return [canvas.width / 2, canvas.height / 2];
};

const drawCircle = (canvasRef: React.RefObject<HTMLCanvasElement>, radius: number = 60) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [centerX, centerY] = getCenter(canvas);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "Black";
    ctx.fillStyle = "Black";

    // Draw the circle
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
};

const drawArrow = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    angle: number,
    arrowLength: number = 30,
    lineWidth: number = 1
) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const [centerX, centerY] = getCenter(canvas);
    const headLength = 10 + lineWidth * 2;
    const headAngle = Math.PI / 6;
    if (arrowLength < 0) {
        arrowLength = Math.abs(arrowLength);
        angle += Math.PI;
    }
    let endX = centerX + (arrowLength - headLength + 4) * Math.cos(angle);
    let endY = centerY + (arrowLength - headLength + 4) * Math.sin(angle);

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Draw arrowhead
    endX = centerX + arrowLength * Math.cos(angle);
    endY = centerY + arrowLength * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headLength * Math.cos(angle - headAngle), endY - headLength * Math.sin(angle - headAngle));
    ctx.lineTo(endX - headLength * Math.cos(angle + headAngle), endY - headLength * Math.sin(angle + headAngle));
    ctx.lineTo(endX, endY);
    ctx.fill();
    ctx.lineWidth = 1;
};

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
    drawArrowWithLabel(0, "a");
    drawArrowWithLabel((2 * Math.PI) / 3, "b");
    drawArrowWithLabel((4 * Math.PI) / 3, "c");
};

interface ReferenceFrameProps {
    voltageSignal: Record<number, string>;
}

const ABCReferenceCanvas: React.FC<ReferenceFrameProps> = ({ voltageSignal } = { voltageSignal: { 0: "black" } }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let animationFrameId: number;
    const radius = 130;
    let latestSignalValue = useRef<Record<number, string>>({ 0: "blue" });

    useEffect(() => {
        latestSignalValue.current = voltageSignal;
    }, [voltageSignal]);

    const animate = () => {
        let signalValue = parseFloat(Object.keys(latestSignalValue.current)[0]);
        let signalColor = Object.values(latestSignalValue.current)[0];
        // console.log(signalValue, signalColor);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                drawCircle(canvasRef, radius);
                drawReferenceFrame(canvasRef, radius);
                ctx.strokeStyle = "#00FF00";
                ctx.fillStyle = "#00FF00";
                drawArrow(canvasRef, 0, signalValue, 5);
                ctx;
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

export default ABCReferenceCanvas;
