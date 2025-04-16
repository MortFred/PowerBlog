import MarkdownRenderer from "../MarkdownRenderer";
import SiteIntroduction from "./HomePageInfo.md";

export function HomePage() {
    return (
        <>
            <main className="ml-64 p-8 max-w-4xl mx-auto">
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <MarkdownRenderer content={SiteIntroduction} />
                </section>
            </main>
        </>
    );
}
