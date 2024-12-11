import { useEffect } from "react";
import { ConverterPage } from "./ConverterPage/ConverterPage";
import worker from "./worker?worker";
const workerInstance = new worker();

function App() {
    useEffect(() => {
        workerInstance.onmessage = (event) => {
            console.log(event.data);
        };
        workerInstance.postMessage("Hello from App");
    });
    return (
        <>
            <ConverterPage />
        </>
    );
}

export default App;
