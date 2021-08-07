/*global chrome*/
import backgroundImage from '../img/pink-fluid-min.jpg';

const defaultState = {
    isDarkModeOff: false,
    timeFormat: "24",
    isQuoteDisable: false,
    quoteTheme: "all",
    backGround: {
        id: "default",
        user: { name: "Pawel Czerwinski" },
        links: { html: "https://unsplash.com/photos/ruJm3dBXCqw" },
        urls: { regular: backgroundImage }
    }
};

const initialSettingsState = { ...defaultState };

export { initialSettingsState, defaultState };