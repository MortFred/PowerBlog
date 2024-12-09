import styled from "styled-components";
import { ConverterPage } from "./ConverterPage/ConverterPage";

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;

function App() {
    return (
        <StyledContent>
            <ConverterPage />
        </StyledContent>
    );
}

export default App;
