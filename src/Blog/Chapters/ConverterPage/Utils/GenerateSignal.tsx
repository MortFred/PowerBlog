import { useRef, useEffect } from "react";

interface SignalProps {
    setOutput: (output: [number, string]) => void;
    signalFunction: (time: number) => number;
    isPaused: boolean;
    setTime?: (time: number) => void;
    alternateColors?: boolean;
    signalColor?: string;
}

export function SignalGenerator({
    setOutput: setVoltage,
    signalFunction = () => 0,
    setTime = () => {},
    alternateColors = false,
    signalColor = "blue",
    isPaused = false,
}: SignalProps) {
    let animationFrameId: number;
    const SignalValue = useRef(0);

    const animate = (time: number) => {
        let color = signalColor;
        if (isPaused) {
            return;
        }
        SignalValue.current = signalFunction(time);
        if (alternateColors) {
            color = SignalValue.current > 0 ? "blue" : "red";
        }
        setVoltage([SignalValue.current, color]);
        setTime(time);
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [signalFunction, isPaused]);

    return <></>;
}
