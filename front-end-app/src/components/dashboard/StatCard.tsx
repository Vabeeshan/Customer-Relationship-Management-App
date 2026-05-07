import type { ReactNode } from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
    color: string;
    iconBg: string;
    sub?: string;
}

export default function StatCard({ label, value, icon, color, iconBg, sub }: StatCardProps) {
    return (
        <div className="stat-card" style={{ "--stat-color": color, "--stat-icon-bg": iconBg } as React.CSSProperties}>
            <div className="stat-card-top">
                <span className="stat-card-label">{label}</span>
                <span className="stat-card-icon">{icon}</span>
            </div>
            <div className="stat-card-value">{value}</div>
            {sub && <div className="stat-card-sub">{sub}</div>}
        </div>
    );
}
