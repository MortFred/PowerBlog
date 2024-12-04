import React, { useRef, useEffect, useState } from "react";

const SineCurve: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = 800;
  const height = 400;
  let animationFrameId: number;
  const [animationSpeed, setAnimationSpeed] = useState(0.05);

  const drawSineCurve = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x < width; x++) {
      const y = height / 2 + 50 * Math.sin((x + time * animationSpeed) * 0.05);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "blue";
    ctx.stroke();
  };

  const animate = (time: number) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawSineCurve(ctx, time);
      }
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [animationSpeed]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      />
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
    </div>
  );
};

export default SineCurve;
