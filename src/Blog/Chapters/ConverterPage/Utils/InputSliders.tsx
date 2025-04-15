import { useState } from "react";
import styled from "styled-components";
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi";

const StyledInputView = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

interface InputSliderProps {
    sliders: { name: string; value: number; setValue: (value: number) => void; min?: number }[];
    pauseAnimation: (value: boolean) => void;
}

export default function InputSliders({ sliders, pauseAnimation }: InputSliderProps) {
    const [isPaused, setIsPaused] = useState(false);

    const togglePause = () => {
        setIsPaused(!isPaused);
        pauseAnimation(!isPaused);
    };
    const sliderElements = sliders.map((slider) => (
        <StyledSlider key={slider.name}>
            {slider.name}
            <input
                type="range"
                min={slider.min ? slider.min : "0"}
                max="1"
                step="0.01"
                value={slider.value}
                onChange={(e) => slider.setValue(parseFloat(e.target.value))}
            />
        </StyledSlider>
    ));
    return (
        <StyledInputView>
            <div>{sliderElements}</div>
            {isPaused ? (
                <FiPlayCircle size={48} strokeWidth={1} onClick={togglePause} />
            ) : (
                <FiPauseCircle size={48} strokeWidth={1} onClick={togglePause} />
            )}
        </StyledInputView>
    );
}
