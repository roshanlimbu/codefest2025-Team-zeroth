import {
    HOME_ROUTE,
    HOW_IT_WORKS_ROUTE,
    TRANSPARENCY_ROUTE,
    ABOUT_ROUTE,
    CONTACT_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE
} from "./routes";

const navMenu = [
    { route: HOME_ROUTE, label: "Home" },
    { route: HOW_IT_WORKS_ROUTE, label: "How it Works" },
    { route: TRANSPARENCY_ROUTE, label: "Transparency" },
    { route: ABOUT_ROUTE, label: "About Us" },
    { route: CONTACT_ROUTE, label: "Contact" },
];

const authMenu = [
    { route: LOGIN_ROUTE, label: "Login" },
    { route: REGISTER_ROUTE, label: "Sign Up" }
];

export { navMenu, authMenu, campaignMenu };
