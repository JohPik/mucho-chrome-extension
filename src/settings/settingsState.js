import backgroundImage from '../img/pink-fluid-min.jpg';

const defaultBackground = {
    id: "default",
    user: { name: "Pawel Czerwinski" },
    links: { html: "https://unsplash.com/photos/ruJm3dBXCqw" },
    urls: { regular: backgroundImage }

}

const initialSettingsState = {
    isDarkModeOff: false,
    timeFormat: "24",
    isQuoteDisable: false,
    quoteTheme: "all",
    backGround: defaultBackground
};

export { initialSettingsState };