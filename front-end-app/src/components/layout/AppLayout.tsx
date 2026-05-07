import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";
import "../../styles/global.css";
import "../../styles/layout.css";
import "../../styles/dashboard.css";
import "../../styles/leads.css";
import "../../styles/components.css";

export default function AppLayout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content-area">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}
