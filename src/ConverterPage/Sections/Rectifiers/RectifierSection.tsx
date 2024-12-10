import { MarkdownRenderer } from "../../../MarkdownRenderer";
import { DiodeRectifiersSection } from "./Diode Rectifiers/DiodeRectifiersSection";
import RectifierIntro from "./Rectifier_circuits.md";

export function RectifierSection() {
    return (
        <>
            <MarkdownRenderer content={RectifierIntro} />
            <DiodeRectifiersSection />
        </>
    );
}
