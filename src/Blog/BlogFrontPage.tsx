import MarkdownRenderer from "../MarkdownRenderer";
import BlogIntroduction from "./BlogIntroduction.md";

export function BlogFrontPage() {
    return (
        <div>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <MarkdownRenderer content={BlogIntroduction} />
                </section>
            </main>
        </div>
    );
}
