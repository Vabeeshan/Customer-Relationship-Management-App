import { NavLink, useNavigate } from "react-router-dom";
import {
    MdDashboard,
    MdPeople,
    MdPersonAdd,
    MdLogout,
} from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";

const navItems = [
    { to: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { to: "/leads",     icon: <MdPeople />,    label: "All Leads" },
    { to: "/leads/create", icon: <MdPersonAdd />, label: "Create Lead" },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <HiOfficeBuilding />
                </div>
                <div>
                    <div className="sidebar-brand-text">CRM Pro</div>
                    <div className="sidebar-brand-sub">Sales Dashboard</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <div className="sidebar-section-label">Main Menu</div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/dashboard"}
                        className={({ isActive }) =>
                            `sidebar-link${isActive ? " active" : ""}`
                        }
                    >
                        <span className="sidebar-link-icon">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User */}
            <div className="sidebar-footer">
                <div className="sidebar-user" onClick={handleLogout} title="Logout">
                    <div className="sidebar-avatar">S</div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">Salesperson</div>
                        <div className="sidebar-user-role">Sales Rep</div>
                    </div>
                    <MdLogout style={{ color: "var(--text-muted)", fontSize: 16 }} />
                </div>
            </div>
        </aside>
    );
}