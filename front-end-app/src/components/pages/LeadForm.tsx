import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { LeadFormData, LeadStatus, LeadSource } from "../../types/lead.types";
import { createLead, getLeadById, updateLead } from "../../api/lead.api";
import { MdArrowBack, MdSave } from "react-icons/md";

const STATUSES: LeadStatus[] = [
    "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost",
];

const SOURCES: LeadSource[] = [
    "Website", "Referral", "Cold Call", "Email Campaign",
    "Social Media", "Trade Show", "Other",
];

const EMPTY: LeadFormData = {
    leadName:            "",
    companyName:         "",
    email:               "",
    phone:               "",
    leadSource:          "Website",
    assignedSalesperson: "",
    status:              "New",
    estimatedDealValue:  0,
};

type Errors = Partial<Record<keyof LeadFormData, string>>;

function validate(form: LeadFormData): Errors {
    const e: Errors = {};
    if (!form.leadName.trim())            e.leadName            = "Lead name is required";
    if (!form.companyName.trim())         e.companyName         = "Company name is required";
    if (!form.email.trim())               e.email               = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                          e.email               = "Enter a valid email";
    if (!form.assignedSalesperson.trim()) e.assignedSalesperson = "Assigned salesperson is required";
    if (form.estimatedDealValue < 0)      e.estimatedDealValue  = "Deal value must be ≥ 0";
    return e;
}

interface Props { mode: "create" | "edit"; }

export default function LeadForm({ mode }: Props) {
    const navigate      = useNavigate();
    const { id }        = useParams<{ id: string }>();
    const [form, setForm]     = useState<LeadFormData>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(mode === "edit");
    const [saving, setSaving]   = useState(false);
    const [toast, setToast]     = useState<string | null>(null);

    useEffect(() => {
        if (mode !== "edit" || !id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const lead = await getLeadById(id);
                setForm({
                    leadName:            lead.leadName,
                    companyName:         lead.companyName,
                    email:               lead.email,
                    phone:               lead.phone,
                    leadSource:          lead.leadSource,
                    assignedSalesperson: lead.assignedSalesperson,
                    status:              lead.status,
                    estimatedDealValue:  lead.estimatedDealValue,
                });
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [mode, id]);

    const set = (field: keyof LeadFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const val = field === "estimatedDealValue"
                ? parseFloat(e.target.value) || 0
                : e.target.value;
            setForm((prev) => ({ ...prev, [field]: val }));
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        try {
            setSaving(true);
            if (mode === "create") {
                await createLead(form);
                setToast("Lead created successfully!");
                setTimeout(() => navigate("/leads"), 1000);
            } else if (id) {
                await updateLead(id, form);
                setToast("Lead updated successfully!");
                setTimeout(() => navigate(`/leads/${id}`), 1000);
            }
        } catch {
            setToast("Something went wrong. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="lead-form-page">
                <div className="dashboard-loading">
                    <div className="spinner" />
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading lead…</span>
                </div>
            </div>
        );
    }

    const isEdit = mode === "edit";

    return (
        <div className="lead-form-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate(isEdit && id ? `/leads/${id}` : "/leads")}
                        style={{ marginBottom: 6, paddingLeft: 0 }}
                    >
                        <MdArrowBack /> {isEdit ? "Back to Lead" : "Back to Leads"}
                    </button>
                    <h1 className="page-header-title">
                        {isEdit ? "Edit Lead" : "Create New Lead"}
                    </h1>
                    <p className="page-header-subtitle">
                        {isEdit
                            ? "Update the lead details below and save."
                            : "Fill in the details below to add a new lead to your pipeline."}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form className="lead-form-card" onSubmit={handleSubmit} noValidate>
                <div className="card-header">
                    <span className="card-title">Lead Details</span>
                </div>

                <div className="card-body">
                    <div className="lead-form-grid">
                        {/* Lead Name */}
                        <div className="form-group">
                            <label className="form-label">
                                Lead Name <span>*</span>
                            </label>
                            <input
                                className={`form-input${errors.leadName ? " error" : ""}`}
                                placeholder="e.g. Ravi Kumar"
                                value={form.leadName}
                                onChange={set("leadName")}
                            />
                            {errors.leadName && (
                                <span className="form-error">{errors.leadName}</span>
                            )}
                        </div>

                        {/* Company Name */}
                        <div className="form-group">
                            <label className="form-label">
                                Company Name <span>*</span>
                            </label>
                            <input
                                className={`form-input${errors.companyName ? " error" : ""}`}
                                placeholder="e.g. Infosys Ltd."
                                value={form.companyName}
                                onChange={set("companyName")}
                            />
                            {errors.companyName && (
                                <span className="form-error">{errors.companyName}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">
                                Email <span>*</span>
                            </label>
                            <input
                                type="email"
                                className={`form-input${errors.email ? " error" : ""}`}
                                placeholder="e.g. ravi@infosys.com"
                                value={form.email}
                                onChange={set("email")}
                            />
                            {errors.email && (
                                <span className="form-error">{errors.email}</span>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                                className="form-input"
                                placeholder="e.g. +91 98765 43210"
                                value={form.phone}
                                onChange={set("phone")}
                            />
                        </div>

                        {/* Lead Source */}
                        <div className="form-group">
                            <label className="form-label">Lead Source</label>
                            <select
                                className="form-select"
                                value={form.leadSource}
                                onChange={set("leadSource")}
                            >
                                {SOURCES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Assigned Salesperson */}
                        <div className="form-group">
                            <label className="form-label">
                                Assigned Salesperson <span>*</span>
                            </label>
                            <input
                                className={`form-input${errors.assignedSalesperson ? " error" : ""}`}
                                placeholder="e.g. Priya Singh"
                                value={form.assignedSalesperson}
                                onChange={set("assignedSalesperson")}
                            />
                            {errors.assignedSalesperson && (
                                <span className="form-error">{errors.assignedSalesperson}</span>
                            )}
                        </div>

                        {/* Status */}
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={form.status}
                                onChange={set("status")}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Deal Value */}
                        <div className="form-group">
                            <label className="form-label">
                                Estimated Deal Value (₹)
                            </label>
                            <input
                                type="number"
                                min={0}
                                className={`form-input${errors.estimatedDealValue ? " error" : ""}`}
                                placeholder="e.g. 500000"
                                value={form.estimatedDealValue === 0 ? "" : form.estimatedDealValue}
                                onChange={set("estimatedDealValue")}
                            />
                            {errors.estimatedDealValue && (
                                <span className="form-error">{errors.estimatedDealValue}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="lead-form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(isEdit && id ? `/leads/${id}` : "/leads")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        <MdSave />
                        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Lead"}
                    </button>
                </div>
            </form>

            {/* Toast */}
            {toast && (
                <div className="toast-container">
                    <div
                        className={`toast ${toast.includes("wrong") ? "toast-error" : "toast-success"}`}
                    >
                        {toast.includes("wrong") ? "❌" : "✅"} {toast}
                    </div>
                </div>
            )}
        </div>
    );
}
