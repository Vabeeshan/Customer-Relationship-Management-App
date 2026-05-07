import { useEffect, useState } from "react";
import type { Lead, DashboardStats } from "../../types/lead.types";
import { getDashboardData } from "../../api/dashboard.api";
import { getLeads } from "../../api/lead.api";
import StatCard from "../dashboard/StatCard";
import StatusBarChart from "../dashboard/StatusBarChart";
import DealValuePieChart from "../dashboard/DealValuePieChart";
import LeadSourceChart from "../dashboard/LeadSourceChart";
import RecentLeadsTable from "../dashboard/RecentLeadsTable";
import {
    MdPeople, MdFiberNew, MdVerified, MdEmojiEvents,
    MdCancel, MdAttachMoney, MdTrendingUp,
} from "react-icons/md";

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(v);

function deriveStats(leads: Lead[]): DashboardStats {
    return {
        totalLeads:     leads.length,
        newLeads:       leads.filter((l) => l.status === "New").length,
        qualifiedLeads: leads.filter((l) => l.status === "Qualified").length,
        wonLeads:       leads.filter((l) => l.status === "Won").length,
        lostLeads:      leads.filter((l) => l.status === "Lost").length,
        totalDealValue: leads.reduce((s, l) => s + l.estimatedDealValue, 0),
        wonDealValue:   leads
            .filter((l) => l.status === "Won")
            .reduce((s, l) => s + l.estimatedDealValue, 0),
    };
}

export default function Dashboard() {
    const [leads, setLeads]     = useState<Lead[]>([]);
    const [stats, setStats]     = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                // Try to get pre-aggregated stats; derive from leads as fallback
                const [leadsData, dashData] = await Promise.allSettled([
                    getLeads(),
                    getDashboardData(),
                ]);

                const leadsArr: Lead[] =
                    leadsData.status === "fulfilled" ? leadsData.value : [];
                setLeads(leadsArr);

                if (dashData.status === "fulfilled" && dashData.value) {
                    setStats(dashData.value);
                } else {
                    setStats(deriveStats(leadsArr));
                }
            } catch {
                setError("Failed to load dashboard data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="spinner" />
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
                        Loading dashboard…
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <div className="empty-state">
                    <div className="empty-state-icon">⚠️</div>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const s = stats ?? deriveStats(leads);

    const statCards = [
        {
            label:  "Total Leads",
            value:  s.totalLeads,
            icon:   <MdPeople />,
            color:  "#8b5cf6",
            iconBg: "rgba(139,92,246,0.15)",
            sub:    "All time",
        },
        {
            label:  "New Leads",
            value:  s.newLeads,
            icon:   <MdFiberNew />,
            color:  "#3b82f6",
            iconBg: "rgba(59,130,246,0.15)",
            sub:    "Awaiting contact",
        },
        {
            label:  "Qualified",
            value:  s.qualifiedLeads,
            icon:   <MdVerified />,
            color:  "#06b6d4",
            iconBg: "rgba(6,182,212,0.15)",
            sub:    "In pipeline",
        },
        {
            label:  "Won",
            value:  s.wonLeads,
            icon:   <MdEmojiEvents />,
            color:  "#10b981",
            iconBg: "rgba(16,185,129,0.15)",
            sub:    "Deals closed",
        },
        {
            label:  "Lost",
            value:  s.lostLeads,
            icon:   <MdCancel />,
            color:  "#ef4444",
            iconBg: "rgba(239,68,68,0.15)",
            sub:    "Deals lost",
        },
        {
            label:  "Total Pipeline",
            value:  fmt(s.totalDealValue),
            icon:   <MdAttachMoney />,
            color:  "#f59e0b",
            iconBg: "rgba(245,158,11,0.15)",
            sub:    "Estimated deal value",
        },
        {
            label:  "Won Revenue",
            value:  fmt(s.wonDealValue),
            icon:   <MdTrendingUp />,
            color:  "#10b981",
            iconBg: "rgba(16,185,129,0.15)",
            sub:    "Closed deals value",
        },
    ];

    return (
        <main className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-header-title">Overview</h1>
                    <p className="page-header-subtitle">
                        Here's what's happening with your sales pipeline today.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid">
                {statCards.map((card) => (
                    <StatCard key={card.label} {...card} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="charts-grid">
                <StatusBarChart leads={leads} />
                <DealValuePieChart leads={leads} />
                <LeadSourceChart leads={leads} />
            </div>

            {/* Recent Leads */}
            <RecentLeadsTable leads={leads} />
        </main>
    );
}