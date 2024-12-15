import styled from "styled-components";

const StyledSlider = styled.div`
    display: grid;
    grid-template-columns: 150px 200px;
`;

interface InputSliderProps {
    sliders: { name: string; value: number; setValue: (value: number) => void }[];
}

export default function InputSliders({ sliders }: InputSliderProps) {
    const sliderElements = sliders.map((slider) => (
        <StyledSlider key={slider.name}>
            {slider.name}
            <input
                type="range"
                min="0.05"
                max="1"
                step="0.01"
                value={slider.value}
                onChange={(e) => slider.setValue(parseFloat(e.target.value))}
            />
        </StyledSlider>
    ));
    return <div>{sliderElements}</div>;
}
