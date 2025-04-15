import MarkdownRenderer from "../MarkdownRenderer";
import SiteIntroduction from "./HomePageInfo.md";

export function HomePage() {
    // Track the current page (you'll need to pass this as a prop in your actual implementation)
    const currentPage = "Home"; // Change this based on the actual page

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">My Blog</h1>
                </div>

                <nav className="mt-6">
                    {[
                        { name: "Home", icon: "🏠" },
                        { name: "About me", icon: "👤" },
                        { name: "Power Electronics", icon: "⚡" },
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={`/${item.name.toLowerCase().replace(" ", "-")}`}
                            className={`flex items-center px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
                                currentPage === item.name ? "bg-blue-50 text-blue-600" : ""
                            }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Social Links (optional) */}
                <div className="mt-auto p-6 space-y-4">
                    <p className="text-gray-600 text-sm">Connect with me</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8 max-w-4xl mx-auto">
                {/* Your existing content goes here */}
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <MarkdownRenderer content={SiteIntroduction} />
                </section>
            </main>
        </div>
    );
}
