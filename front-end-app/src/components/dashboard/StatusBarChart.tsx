import type { Lead } from "../../types/lead.types";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface Props { leads: Lead[]; }

const STATUS_COLORS: Record<string, string> = {
    "New":           "#3b82f6",
    "Contacted":     "#f59e0b",
    "Qualified":     "#06b6d4",
    "Proposal Sent": "#a855f7",
    "Won":           "#10b981",
    "Lost":          "#ef4444",
};

const ALL_STATUSES = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

export default function StatusBarChart({ leads }: Props) {
    const data = ALL_STATUSES.map((status) => ({
        status,
        count: leads.filter((l) => l.status === status).length,
    }));

    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div>
                    <div className="chart-card-title">Leads by Status</div>
                    <div className="chart-card-subtitle">Distribution across pipeline stages</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barSize={32} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
                    <XAxis
                        dataKey="status"
                        tick={{ fill: "#9090aa", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#9090aa", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip
                        contentStyle={{ background: "#1a1a24", border: "1px solid #2a2a3a", borderRadius: 8, color: "#f0f0f5" }}
                        cursor={{ fill: "rgba(124,58,237,0.08)" }}
                    />
                    <Bar dataKey="count" name="Leads" radius={[4, 4, 0, 0]}>
                        {data.map((entry) => (
                            <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#7c3aed"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
