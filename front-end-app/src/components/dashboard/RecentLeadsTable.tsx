import { Link } from "react-router-dom";
import type { Lead } from "../../types/lead.types";
import StatusBadge from "../leads/StatusBadge";

interface Props { leads: Lead[]; }

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

export default function RecentLeadsTable({ leads }: Props) {
    const recent = [...leads]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="recent-leads-card">
            <div className="recent-leads-header">
                <span className="recent-leads-title">Recent Leads</span>
                <Link to="/leads" className="view-all-link">View all →</Link>
            </div>
            {recent.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <p>No leads yet. Create your first lead!</p>
                </div>
            ) : (
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Deal Value</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recent.map((lead) => (
                            <tr key={lead.id} onClick={() => window.location.href = `/leads/${lead.id}`}>
                                <td>
                                    <div className="lead-name-cell">
                                        <span className="lead-name">{lead.leadName}</span>
                                        <span className="lead-email">{lead.email}</span>
                                    </div>
                                </td>
                                <td className="lead-company">{lead.companyName}</td>
                                <td><StatusBadge status={lead.status} /></td>
                                <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{lead.assignedSalesperson}</td>
                                <td className="lead-deal-value">{fmt(lead.estimatedDealValue)}</td>
                                <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                                    {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
