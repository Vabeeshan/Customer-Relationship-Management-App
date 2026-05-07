import { useNavigate } from "react-router-dom";
import type { Lead } from "../../types/lead.types";
import StatusBadge from "./StatusBadge";

interface Props { lead: Lead; }

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

export default function LeadCard({ lead }: Props) {
    const navigate = useNavigate();

    return (
        <div className="lead-card" onClick={() => navigate(`/leads/${lead.id}`)}>
            <div className="lead-card-header">
                <div>
                    <div className="lead-card-name">{lead.leadName}</div>
                    <div className="lead-card-company">{lead.companyName}</div>
                </div>
                <StatusBadge status={lead.status} />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{lead.email}</div>
            <div className="lead-card-footer">
                <span className="lead-card-value">{fmt(lead.estimatedDealValue)}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {lead.leadSource}
                </span>
            </div>
        </div>
    );
}
