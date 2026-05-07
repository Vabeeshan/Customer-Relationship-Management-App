import { useLocation } from "react-router-dom";

const PAGE_TITLES: Record<string, string> = {
    "/dashboard":   "Dashboard",
    "/leads":        "All Leads",
    "/leads/create": "Create Lead",
};

function getTitle(pathname: string): string {
    if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
    if (pathname.includes("/edit")) return "Edit Lead";
    if (pathname.match(/\/leads\/.+/)) return "Lead Detail";
    return "CRM Pro";
}

export default function Navbar() {
    const { pathname } = useLocation();
    const now = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year:    "numeric",
        month:   "long",
        day:     "numeric",
    });

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-page-title">{getTitle(pathname)}</h1>
            </div>
            <div className="navbar-right">
                <span className="navbar-time">{now}</span>
            </div>
        </header>
    );
}