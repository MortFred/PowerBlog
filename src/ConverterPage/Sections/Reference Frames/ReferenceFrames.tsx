import MarkdownRenderer from "../../../MarkdownRenderer";
import { ABCReferenceFrameSection } from "./ABC Reference Frame/ABCReferenceFrame";
import ReferenceFrameInfo from "./Reference_frames.md";

export function ReferenceFrameSection() {
    return (
        <section id="reference-frames">
            <MarkdownRenderer content={ReferenceFrameInfo} />
            <ABCReferenceFrameSection />
        </section>
    );
}
