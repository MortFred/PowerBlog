import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MarkdownRenderer from "../MarkdownRenderer";
import BlogIntroduction from "./BlogIntroduction.md";
import { PowerConverters } from "./Chapters/PowerConverters/PowerConverterSection";

export function BlogFrontPage() {
    const location = useLocation();

    // Handle nested routes and hash navigation
    useEffect(() => {
        // Check if there's a hash in the URL (e.g., #introduction)
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <MarkdownRenderer content={BlogIntroduction} />
                </section>
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <PowerConverters />
                </section>
            </main>
        </div>
    );
}
