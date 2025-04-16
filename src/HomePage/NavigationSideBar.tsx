import { NavLink } from "react-router-dom";

export default function NavigationBar() {
    return (
        <nav className="fixed left-0 top-0 h-full bg-white shadow-lg w-[200px]">
            <div className="flex flex-col gap-8 justify-start items-center">
                <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
                <ul className="space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 ${isActive ? "font-bold" : ""}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 ${isActive ? "font-bold" : ""}`
                            }
                        >
                            About Me
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/blog"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 ${isActive ? "font-bold" : ""}`
                            }
                        >
                            Power Electronics
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
