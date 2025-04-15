import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

export default function Main() {
  return <App />;
}
