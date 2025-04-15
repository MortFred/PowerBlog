import MarkdownRenderer from "../MarkdownRenderer";
import BlogIntroduction from "./BlogIntroduction.md";

export function BlogFrontPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
                        <div className="space-x-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Archive
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                About
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Blog Introduction Section */}
                <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <MarkdownRenderer content={BlogIntroduction} />
                </section>

                {/* Recent Posts Preview */}
                <section className="grid gap-6 md:grid-cols-2 mb-12">
                    {[1, 2].map((item) => (
                        <article
                            key={item}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Post Title {item}</h2>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Read more →</span>
                                <time className="text-gray-500">Mar 15, 2024</time>
                            </div>
                        </article>
                    ))}
                </section>

                {/* Newsletter Subscription */}
                <section className="bg-white rounded-lg shadow-sm p-6 mb-12">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Subscribe to my newsletter</h3>
                    <form className="flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </section>

                {/* About Section */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
                    <div className="flex gap-6">
                        <img
                            src="/placeholder-avatar.jpg"
                            alt="Author avatar"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-gray-600">
                            I'm a passionate developer and writer. When I'm not coding, you can find me exploring new
                            technologies or hiking in nature.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="text-center text-gray-600">
                        <p>© 2024 My Blog. All rights reserved.</p>
                        <p className="mt-2">Built with Next.js and Tailwind CSS</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
