import { useEffect } from "react";
import worker from "./worker?worker";
import { ConverterPage } from "./Blog/Chapters/ConverterPage/ConverterPage";
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
