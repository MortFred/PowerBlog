import MarkdownRenderer from "../../../MarkdownRenderer";
import { ABCReferenceFrameSection } from "./ABC Reference Frame/ABCReferenceFrame";
import { AlphaBetaReferenceFrameSection } from "./AlphaBeta Reference Frame/AlphaBetaReferenceFrame";
import { DQReferenceFrameSection } from "./DQ Reference Frame/DQReferenceFrame";
import ReferenceFrameInfo from "./Reference_frames.md";

export function ReferenceFrameSection() {
    return (
        <section id="reference-frames">
            <MarkdownRenderer content={ReferenceFrameInfo} />
            <ABCReferenceFrameSection />
            <AlphaBetaReferenceFrameSection />
            <DQReferenceFrameSection />
        </section>
    );
}
