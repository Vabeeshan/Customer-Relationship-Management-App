import type { LeadStatus } from "../../types/lead.types";

interface Props { status: LeadStatus; }

const CLASS_MAP: Record<LeadStatus, string> = {
    "New":           "status-new",
    "Contacted":     "status-contacted",
    "Qualified":     "status-qualified",
    "Proposal Sent": "status-proposal",
    "Won":           "status-won",
    "Lost":          "status-lost",
};

export default function StatusBadge({ status }: Props) {
    return (
        <span className={`status-badge ${CLASS_MAP[status]}`}>
            {status}
        </span>
    );
}
