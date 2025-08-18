import { NavLink, useLocation } from "react-router-dom";
import { navigationData, NavigationItem } from "./NavigationTree";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function NavigationSideBar() {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [activeSection, setActiveSection] = useState<string>("");
    const location = useLocation();
    const pathArray = location.pathname.split("/").filter(Boolean);
    const selectedSectionId = pathArray.join("-");

    // Handle hash changes for section highlighting
    useEffect(() => {
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        }
    }, [location.hash]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev: Record<string, boolean>) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const renderNavItems = (selectedSectionId: string, items?: NavigationItem[]) => {
        return items?.map((item) => (
            <li key={item.id} className="ml-4">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => item.children && toggleSection(item.id)}
                >
                    <NavLink
                        to={`/${item.path}`}
                        className={({ isActive }) =>
                            `text-gray-600 hover:text-gray-900 ${
                                isActive || (activeSection && item.id.includes(activeSection)) ? "font-bold" : ""
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                    {item.children ? (
                        expandedSections[item.id] ? (
                            <FiChevronDown size={16} />
                        ) : (
                            <FiChevronRight size={16} />
                        )
                    ) : null}
                </div>
                {item.children && expandedSections[item.id] && (
                    <ul className="ml-4">{renderNavItems(selectedSectionId, Object.values(item.children))}</ul>
                )}
            </li>
        ));
    };
    return (
        <nav className="fixed left-0 top-0 h-full bg-white shadow-lg w-[200px] p-4">
            <div className="flex flex-col gap-8 justify-start items-center">
                <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
                <ul className="space-x-6">
                    {renderNavItems(selectedSectionId, [
                        navigationData.Home,
                        navigationData.AboutMe,
                        navigationData.Blog,
                        navigationData.Test,
                    ])}
                </ul>
            </div>
        </nav>
    );
}
