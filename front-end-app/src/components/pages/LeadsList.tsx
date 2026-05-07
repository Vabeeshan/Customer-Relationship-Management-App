import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Lead, LeadStatus } from "../../types/lead.types";
import { getLeads, deleteLead } from "../../api/lead.api";
import StatusBadge from "../leads/StatusBadge";
import LeadCard from "../leads/LeadCard";
import { MdSearch, MdAdd, MdEdit, MdDelete, MdFilterList } from "react-icons/md";

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(v);

const ALL_STATUSES: LeadStatus[] = [
    "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost",
];

type SortKey = "leadName" | "companyName" | "status" | "estimatedDealValue" | "createdAt";

export default function LeadsList() {
    const navigate = useNavigate();
    const [leads, setLeads]         = useState<Lead[]>([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState("");
    const [statusFilter, setStatus] = useState<LeadStatus | "">("");
    const [sortKey, setSortKey]     = useState<SortKey>("createdAt");
    const [sortAsc, setSortAsc]     = useState(false);
    const [deleteId, setDeleteId]   = useState<string | null>(null);
    const [deleting, setDeleting]   = useState(false);

    const load = async () => {
        try {
            setLoading(true);
            const data = await getLeads();
            setLeads(data);
        } catch {
            /* handle silently — empty state shown */
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc((p) => !p);
        else { setSortKey(key); setSortAsc(true); }
    };

    const filtered = leads
        .filter((l) => {
            const q = search.toLowerCase();
            return (
                l.leadName.toLowerCase().includes(q) ||
                l.companyName.toLowerCase().includes(q) ||
                l.email.toLowerCase().includes(q)
            );
        })
        .filter((l) => (statusFilter ? l.status === statusFilter : true))
        .sort((a, b) => {
            const av = a[sortKey] ?? "";
            const bv = b[sortKey] ?? "";
            const cmp =
                typeof av === "number" && typeof bv === "number"
                    ? av - bv
                    : String(av).localeCompare(String(bv));
            return sortAsc ? cmp : -cmp;
        });

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            setDeleting(true);
            await deleteLead(deleteId);
            setLeads((prev) => prev.filter((l) => l.id !== deleteId));
        } finally {
            setDeleting(false);
            setDeleteId(null);
        }
    };

    const SortIcon = ({ col }: { col: SortKey }) => (
        <span className="sort-icon" style={{ opacity: sortKey === col ? 1 : 0.35 }}>
            {sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}
        </span>
    );

    return (
        <div className="leads-page">
            {/* Toolbar */}
            <div className="leads-toolbar">
                <div className="search-bar">
                    <MdSearch className="search-bar-icon" />
                    <input
                        placeholder="Search leads, companies, emails…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MdFilterList style={{ color: "var(--text-muted)" }} />
                    <select
                        className="form-select"
                        style={{ width: "auto" }}
                        value={statusFilter}
                        onChange={(e) => setStatus(e.target.value as LeadStatus | "")}
                    >
                        <option value="">All Statuses</option>
                        {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="leads-toolbar-right">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/leads/create")}
                    >
                        <MdAdd /> New Lead
                    </button>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="dashboard-loading">
                    <div className="spinner" />
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading leads…</span>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="leads-table-card" style={{ display: window.innerWidth <= 768 ? "none" : "block" }}>
                        <div className="leads-table-wrapper">
                            <table className="leads-table">
                                <thead>
                                    <tr>
                                        <th className="sortable" onClick={() => handleSort("leadName")}>
                                            Lead <SortIcon col="leadName" />
                                        </th>
                                        <th className="sortable" onClick={() => handleSort("companyName")}>
                                            Company <SortIcon col="companyName" />
                                        </th>
                                        <th>Email</th>
                                        <th className="sortable" onClick={() => handleSort("status")}>
                                            Status <SortIcon col="status" />
                                        </th>
                                        <th>Source</th>
                                        <th>Assigned To</th>
                                        <th className="sortable" onClick={() => handleSort("estimatedDealValue")}>
                                            Deal Value <SortIcon col="estimatedDealValue" />
                                        </th>
                                        <th className="sortable" onClick={() => handleSort("createdAt")}>
                                            Created <SortIcon col="createdAt" />
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={9}>
                                                <div className="empty-state">
                                                    <div className="empty-state-icon">🔍</div>
                                                    <p>No leads found. Try adjusting your search or filters.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((lead) => (
                                            <tr
                                                key={lead.id}
                                                onClick={() => navigate(`/leads/${lead.id}`)}
                                            >
                                                <td>
                                                    <div className="lead-name-cell">
                                                        <span className="lead-name">{lead.leadName}</span>
                                                    </div>
                                                </td>
                                                <td className="lead-company">{lead.companyName}</td>
                                                <td className="lead-email">{lead.email}</td>
                                                <td><StatusBadge status={lead.status} /></td>
                                                <td style={{ color: "var(--text-secondary)", fontSize: 12.5 }}>
                                                    {lead.leadSource}
                                                </td>
                                                <td style={{ color: "var(--text-secondary)", fontSize: 12.5 }}>
                                                    {lead.assignedSalesperson}
                                                </td>
                                                <td className="lead-deal-value">{fmt(lead.estimatedDealValue)}</td>
                                                <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                                                    {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                                                </td>
                                                <td>
                                                    <div
                                                        className="actions-cell"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <button
                                                            className="btn btn-ghost btn-icon btn-sm"
                                                            title="Edit"
                                                            onClick={() => navigate(`/leads/${lead.id}/edit`)}
                                                        >
                                                            <MdEdit />
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-icon btn-sm"
                                                            title="Delete"
                                                            onClick={() => setDeleteId(lead.id)}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="table-footer">
                            <span className="table-count">
                                Showing {filtered.length} of {leads.length} leads
                            </span>
                        </div>
                    </div>

                    {/* Mobile cards */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 12,
                        }}
                    >
                        {filtered.map((lead) => (
                            <LeadCard key={lead.id} lead={lead} />
                        ))}
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Delete Lead</span>
                            <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                                Are you sure you want to delete this lead? This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
