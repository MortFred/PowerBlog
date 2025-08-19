interface NavData {
    id: string;
    label: string;
}

interface PowerElectronicsSection {
    id: string;
    label: string;
    rectifierCircuits: NavData;
    referenceFrames: NavData;
}

interface BlogStructure {
    id: string;
    label: string;
    powerElectronics: PowerElectronicsSection;
}

export interface SiteStructure {
    Home: NavData;
    AboutMe: NavData;
    Blog: BlogStructure;
    Test: NavData;
}

export const siteStructure: SiteStructure = {
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
        powerElectronics: {
            id: "power-electronics",
            label: "Power Electronics",
            rectifierCircuits: {
                id: "rectifier-circuits",
                label: "Rectifier Circuits",
            },
            referenceFrames: {
                id: "reference-frames",
                label: "Reference Frames",
            },
        },
    },

    Test: {
        id: "test",
        label: "Test Page",
    },
};

function getSubComponentKeys(dict: any) {
    const keys = Object.keys(dict);
    return keys.filter((key) => key !== "id" && key !== "label");
}

function getUrlComponentsAsString(urlComponents: string[]) {
    let outputString = "";
    urlComponents.map((string) => (outputString += string + "/"));
    return outputString;
}

function FormatSiteStructureLabels() {
    let urlComponents: string[] = [];
    function populateLabel(dict: any) {
        urlComponents.push(dict.id);
        let keys = getSubComponentKeys(dict);
        if (keys.length == 0) {
            dict.id = getUrlComponentsAsString(urlComponents);
            console.log(dict.id);
        } else {
            keys.forEach((key) => populateLabel(dict[key]));
        }
        urlComponents.pop();
    }
    populateLabel(siteStructure);
    return siteStructure;
}
const navigationStructure = FormatSiteStructureLabels();

export default navigationStructure;
