import styled from "styled-components";
import SineCurve from "./MovingSineComponent";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function ConverterPage() {
  return (
    <StyledPage>
      <SineCurve />
    </StyledPage>
  );
}
