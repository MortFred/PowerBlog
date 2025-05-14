import { NavLink, useLocation } from "react-router-dom";
import { navigationData, NavigationItem } from "./NavigationTree";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export default function NavigationSideBar() {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const location = useLocation();
    const pathArray = location.pathname.split("/").filter(Boolean);
    const selectedSectionId = pathArray.join("-");

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
                        to={`/${item.id.replace("-", "/")}`}
                        className={({ isActive }) =>
                            `text-gray-600 hover:text-gray-900 ${selectedSectionId === item.id ? "font-bold" : ""}`
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
                    <ul className="ml-4">{renderNavItems(selectedSectionId, item.children)}</ul>
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
