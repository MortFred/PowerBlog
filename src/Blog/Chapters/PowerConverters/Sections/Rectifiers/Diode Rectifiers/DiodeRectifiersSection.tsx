import MarkdownRenderer from "../../../../../../MarkdownRenderer";
import { FullWaveRectifierSection } from "./FullWaveRectifier";
import { HalfWaveRectifierSection } from "./HalfWaveRectifier";
import DiodeRectifiersInfo from "./Text/Diode_rectifiers.md";

export function DiodeRectifiersSection() {
    return (
        <section id="diode-rectifiers">
            <MarkdownRenderer content={DiodeRectifiersInfo} />
            <HalfWaveRectifierSection />
            <FullWaveRectifierSection />
        </section>
    );
}
