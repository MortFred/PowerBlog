import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./HomePage/NavigationSideBar";
import { BlogFrontPage } from "./Blog/BlogFrontPage";
import { HomePage } from "./HomePage/HomePage";
import { TestPage } from "./TestPage/TestPage";

export default function App() {
    return (
        <Router>
            <div className="grid grid-cols-[200px_1fr] gap-4">
                <div>
                    <NavigationBar />
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blog" element={<BlogFrontPage />} />
                        <Route path="/test" element={<TestPage />} />
                    </Routes>
                    <footer className="bg-white border-t mt-12">
                        <div className="max-w-4xl mx-auto px-4 py-6">
                            <div className="text-center text-gray-600">
                                <p>2025</p>
                                <p className="mt-2">Built with React, TailwindCSS and Vite.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </Router>
    );
}
