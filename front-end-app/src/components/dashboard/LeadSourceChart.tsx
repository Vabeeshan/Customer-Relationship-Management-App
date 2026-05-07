import type { Lead } from "../../types/lead.types";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
} from "recharts";

interface Props { leads: Lead[]; }

const ALL_SOURCES = ["Website", "Referral", "Cold Call", "Email Campaign", "Social Media", "Trade Show", "Other"];

export default function LeadSourceChart({ leads }: Props) {
    const data = ALL_SOURCES.map((source) => ({
        source,
        count: leads.filter((l) => l.leadSource === source).length,
    })).filter((d) => d.count > 0);

    return (
        <div className="chart-card chart-card-wide">
            <div className="chart-card-header">
                <div>
                    <div className="chart-card-title">Leads by Source</div>
                    <div className="chart-card-subtitle">Which channels are generating the most leads</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={data}
                    layout="vertical"
                    barSize={20}
                    margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" horizontal={false} />
                    <XAxis
                        type="number"
                        tick={{ fill: "#9090aa", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="source"
                        tick={{ fill: "#9090aa", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={100}
                    />
                    <Tooltip
                        contentStyle={{ background: "#1a1a24", border: "1px solid #2a2a3a", borderRadius: 8, color: "#f0f0f5" }}
                        cursor={{ fill: "rgba(124,58,237,0.08)" }}
                    />
                    <Bar dataKey="count" name="Leads" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
