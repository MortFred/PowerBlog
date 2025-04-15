import { useEffect } from "react";
import worker from "./worker?worker";
import { BlogFrontPage } from "./Blog/BlogFrontPage";
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
            <BlogFrontPage />
        </>
    );
}

export default App;
