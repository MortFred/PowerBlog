export interface NavigationItem {
    id: string;
    label: string;
    path: string;
    children?: Record<string, NavigationItem>;
}

type NavTree = {
    Home: NavigationItem;
    AboutMe: NavigationItem;
    Blog: NavigationItem;
    Test: NavigationItem;
};

// Helper function to build nested navigation structure with proper paths
function buildNavigationTree(items: Record<string, any>, parentPath: string = ""): Record<string, NavigationItem> {
    const result: Record<string, NavigationItem> = {};

    for (const key in items) {
        const item = items[key];
        const currentPath = parentPath ? `${parentPath}/${item.id}` : item.id;

        result[key] = {
            id: item.id,
            label: item.label,
            path: currentPath,
            ...(item.children && { children: buildNavigationTree(item.children, currentPath) }),
        };
    }

    return result;
}

// Raw navigation data without paths
const rawNavigationData = {
    Home: {
        id: "home",
        label: "Home",
    },
    AboutMe: {
        id: "about-me",
        label: "About Me",
    },
    Blog: {
        id: "blog",
        label: "Power Blog",
        children: {
            "power-electronics": {
                id: "power-electronics",
                label: "Power Electronics",
                children: {
                    introduction: { id: "introduction", label: "Introduction" },
                    "rectifier-circuits": {
                        id: "rectifier-circuits",
                        label: "Rectifier Circuits",
                        children: {
                            "diode-rectifiers": {
                                id: "diode-rectifiers",
                                label: "Diode Rectifiers",
                                children: {
                                    "half-wave-rectifiers": {
                                        id: "half-wave-rectifiers",
                                        label: "Half Wave Rectifiers",
                                    },
                                    "full-wave-rectifiers": {
                                        id: "full-wave-rectifiers",
                                        label: "Full Wave Rectifiers",
                                    },
                                    "output-filters": { id: "output-filters", label: "Output Filters" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    Test: {
        id: "test",
        label: "Test Page",
    },
};

// Generate the final navigation data with proper paths
export const navigationData: NavTree = buildNavigationTree(rawNavigationData) as NavTree;
