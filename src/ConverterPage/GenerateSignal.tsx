import { useRef, useEffect } from "react";

interface VoltageSignalProps {
    setOutput: (output: Record<number, string>) => void;
    signalFunction: (time: number) => number;
    setTime?: (time: number) => void;
    alternateColors?: boolean;
}

export function SignalGenerator({
    setOutput: setVoltage,
    signalFunction = () => 0,
    setTime = () => {},
    alternateColors = false,
}: VoltageSignalProps) {
    let animationFrameId: number;
    const SignalValue = useRef(0);

    const animate = (time: number) => {
        SignalValue.current = signalFunction(time);
        let color = "blue";
        if (alternateColors) {
            color = SignalValue.current > 0 ? "blue" : "red";
        }
        setVoltage({ [SignalValue.current]: color });
        setTime(time);
        animationFrameId = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [signalFunction]);

    return <></>;
}
