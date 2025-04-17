import { NavLink, useLocation } from "react-router-dom";

interface NavigationItem {
    id: string;
    label: string;
    children?: NavigationItem[];
}

type NavTree = {
    Home: NavigationItem;
    AboutMe: NavigationItem;
    Blog: NavigationItem;
};

const navigationData: NavTree = {
    Home: {
        id: "home",
        label: "Home",
    },
    AboutMe: {
        id: "about-me",
        label: "About Me",
    },
    Blog: {
        id: "blog-root",
        label: "Power Electronics",
        children: [
            {
                id: "power-electronics-basics",
                label: "Basics",
                children: [
                    { id: "introduction", label: "Introduction" },
                    { id: "fundamentals", label: "Fundamentals" },
                ],
            },
            {
                id: "advanced-topics",
                label: "Advanced Topics",
                children: [
                    { id: "converter-types", label: "Converter Types" },
                    { id: "control-strategies", label: "Control Strategies" },
                ],
            },
        ],
    },
};

const renderNavItems = (selectedSectionId: string, items?: NavigationItem[]) => {
    return items?.map((item) => (
        <li key={item.id} className="ml-4">
            <NavLink
                to={`/${item.id.replace("-", "/")}`}
                className={({ isActive }) =>
                    `text-gray-600 hover:text-gray-900 ${selectedSectionId === item.id ? "font-bold" : ""}`
                }
            >
                {item.label}
            </NavLink>
            {item.children && <ul className="ml-4">{renderNavItems(selectedSectionId, item.children)}</ul>}
        </li>
    ));
};

export default function NavigationSideBar() {
    const location = useLocation();
    const pathArray = location.pathname.split("/").filter(Boolean);
    const selectedSectionId = pathArray.join("-");

    return (
        <nav className="fixed left-0 top-0 h-full bg-white shadow-lg w-[200px] p-4">
            <div className="flex flex-col gap-8 justify-start items-center">
                <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
                <ul className="space-x-6">
                    {renderNavItems(selectedSectionId, [
                        navigationData.Home,
                        navigationData.AboutMe,
                        navigationData.Blog,
                    ])}
                </ul>
            </div>
        </nav>
    );
}
