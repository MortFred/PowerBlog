export interface NavigationItem {
    id: string;
    label: string;
    children?: NavigationItem[];
}

type NavTree = {
    Home: NavigationItem;
    AboutMe: NavigationItem;
    Blog: NavigationItem;
};

export const navigationData: NavTree = {
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
