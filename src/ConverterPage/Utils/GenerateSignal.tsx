import { useRef, useEffect } from "react";

interface SignalProps {
    setOutput: (output: [number, string]) => void;
    signalFunction: (time: number) => number;
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
}: SignalProps) {
    let animationFrameId: number;
    const SignalValue = useRef(0);

    const animate = (time: number) => {
        SignalValue.current = signalFunction(time);
        let color = signalColor;
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
    }, [signalFunction]);

    return <></>;
}
