import { useEffect } from "react";
import worker from "./worker?worker";
import { HomePage } from "./HomePage/HomePage";
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
            <HomePage />
        </>
    );
}

export default App;
