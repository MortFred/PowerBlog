import { useEffect } from "react";
import worker from "./worker?worker";
import { PowerConverters } from "./Blog/Chapters/PowerConverters/PowerConverterSection";
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
            <PowerConverters />
        </>
    );
}

export default App;
