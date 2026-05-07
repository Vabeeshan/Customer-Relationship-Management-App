import type { Lead } from "../../types/lead.types";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface Props { leads: Lead[]; }

const SLICES = [
    { key: "Won",    color: "#10b981" },
    { key: "Lost",   color: "#ef4444" },
    { key: "Active", color: "#7c3aed" },
];

export default function DealValuePieChart({ leads }: Props) {
    const won   = leads.filter((l) => l.status === "Won").reduce((s, l) => s + l.estimatedDealValue, 0);
    const lost  = leads.filter((l) => l.status === "Lost").reduce((s, l) => s + l.estimatedDealValue, 0);
    const active = leads
        .filter((l) => !["Won", "Lost"].includes(l.status))
        .reduce((s, l) => s + l.estimatedDealValue, 0);

    const data = [
        { name: "Won",    value: won },
        { name: "Lost",   value: lost },
        { name: "Active", value: active },
    ].filter((d) => d.value > 0);

    const fmt = (v: number) =>
        v >= 1_000_000
            ? `₹${(v / 1_000_000).toFixed(1)}M`
            : `₹${(v / 1_000).toFixed(0)}K`;

    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div>
                    <div className="chart-card-title">Deal Value Split</div>
                    <div className="chart-card-subtitle">Won vs Lost vs Active pipeline</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map((entry) => {
                            const slice = SLICES.find((s) => s.key === entry.name);
                            return <Cell key={entry.name} fill={slice?.color ?? "#7c3aed"} />;
                        })}
                    </Pie>
                    <Tooltip
                        formatter={(val: string | number) => [fmt(Number(val)), "Value"]}
                        contentStyle={{ background: "#1a1a24", border: "1px solid #2a2a3a", borderRadius: 8, color: "#f0f0f5" }}
                    />
                    <Legend
                        formatter={(value) => <span style={{ color: "#9090aa", fontSize: 12 }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
