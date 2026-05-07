import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Lead, Note } from "../../types/lead.types";
import { getLeadById, deleteLead } from "../../api/lead.api";
import { getNotesByLead, createNote } from "../../api/notes.api";
import StatusBadge from "../leads/StatusBadge";
import { MdEdit, MdDelete, MdArrowBack, MdNote } from "react-icons/md";

const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(v);

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
    });

export default function LeadDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lead, setLead] = useState<Lead | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteModal, setDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                setLoading(true);
                const [leadData, notesData] = await Promise.allSettled([
                    getLeadById(id),
                    getNotesByLead(id),
                ]);
                if (leadData.status === "fulfilled") setLead(leadData.value);
                if (notesData.status === "fulfilled") setNotes(notesData.value ?? []);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAddNote = async () => {
        if (!noteText.trim() || !id) return;
        try {
            setSaving(true);
            const newNote = await createNote({
                leadId: Number(id),
                noteContent: noteText.trim(),
                createdBy: "dhanushan" // Using user provided name from example
            });
            setNotes((prev) => [newNote, ...prev]);
            setNoteText("");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        try {
            setDeleting(true);
            await deleteLead(id);
            navigate("/leads");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="lead-detail-page">
                <div className="dashboard-loading">
                    <div className="spinner" />
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading lead…</span>
                </div>
            </div>
        );
    }

    if (!lead) {
        return (
            <div className="lead-detail-page">
                <div className="empty-state">
                    <div className="empty-state-icon">❌</div>
                    <p>Lead not found.</p>
                    <Link to="/leads" className="btn btn-secondary" style={{ marginTop: 12 }}>
                        Back to Leads
                    </Link>
                </div>
            </div>
        );
    }

    const INFO_FIELDS = [
        { label: "Lead Name", value: lead.leadName },
        { label: "Company", value: lead.companyName },
        { label: "Email", value: lead.email },
        { label: "Phone", value: lead.phone },
        { label: "Lead Source", value: lead.leadSource },
        { label: "Assigned To", value: lead.assignedSalesperson },
        { label: "Estimated Value", value: fmt(lead.estimatedDealValue) },
        { label: "Status", value: <StatusBadge status={lead.status} /> },
        { label: "Created", value: fmtDate(lead.createdAt) },
        { label: "Last Updated", value: fmtDate(lead.updatedAt) },
    ];

    return (
        <div className="lead-detail-page">
            {/* Back + Header */}
            <div className="lead-detail-header">
                <div className="lead-detail-header-left">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate("/leads")}
                        style={{ marginBottom: 4, paddingLeft: 0 }}
                    >
                        <MdArrowBack /> Back to Leads
                    </button>
                    <h2 className="lead-detail-name">{lead.leadName}</h2>
                    <div className="lead-detail-meta">
                        <span className="lead-detail-meta-item">🏢 {lead.companyName}</span>
                        <span className="lead-detail-meta-item">✉️ {lead.email}</span>
                        <span className="lead-detail-meta-item">📞 {lead.phone}</span>
                        <StatusBadge status={lead.status} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/leads/${id}/edit`)}
                    >
                        <MdEdit /> Edit Lead
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setDelete(true)}
                    >
                        <MdDelete /> Delete
                    </button>
                </div>
            </div>

            {/* Info Grid */}
            <div className="lead-detail-grid">
                <div className="lead-info-card" style={{ gridColumn: "1 / -1" }}>
                    <div className="card-header">
                        <span className="card-title">Lead Information</span>
                    </div>
                    <div className="lead-info-grid">
                        {INFO_FIELDS.map((f) => (
                            <div className="lead-info-item" key={f.label}>
                                <div className="lead-info-label">{f.label}</div>
                                <div className="lead-info-value">{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div className="notes-section">
                    <div className="card-header">
                        <span className="card-title">
                            <MdNote style={{ verticalAlign: "middle", marginRight: 6 }} />
                            Notes ({notes.length})
                        </span>
                    </div>

                    {notes.length === 0 && (
                        <div className="empty-state" style={{ padding: "32px 20px" }}>
                            <p>No notes yet. Add the first one below.</p>
                        </div>
                    )}

                    {notes.map((note) => (
                        <div className="note-item" key={note.id}>
                            <div className="note-content">{note.noteContent}</div>
                            <div className="note-meta">
                                <span>By: {note.createdBy || "System"}</span> • {new Date(note.createdAt).toLocaleString("en-IN")}
                            </div>
                        </div>
                    ))}

                    <div className="add-note-form">
                        <textarea
                            placeholder="Write a note about this lead…"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleAddNote}
                            disabled={saving || !noteText.trim()}
                            style={{ flexShrink: 0 }}
                        >
                            {saving ? "Saving…" : "Add Note"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="modal-overlay" onClick={() => setDelete(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Delete Lead</span>
                            <button className="modal-close" onClick={() => setDelete(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                                Are you sure you want to delete <strong>{lead.leadName}</strong>?
                                This will also delete all associated notes and cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDelete(false)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting…" : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
