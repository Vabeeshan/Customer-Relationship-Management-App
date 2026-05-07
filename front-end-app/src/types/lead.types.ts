export type LeadStatus =
    | "New"
    | "Contacted"
    | "Qualified"
    | "Proposal Sent"
    | "Won"
    | "Lost";

export type LeadSource =
    | "Website"
    | "Referral"
    | "Cold Call"
    | "Email Campaign"
    | "Social Media"
    | "Trade Show"
    | "Other";

export interface Lead {
    id: string;
    leadName: string;
    companyName: string;
    email: string;
    phone: string;
    leadSource: LeadSource;
    assignedSalesperson: string;
    status: LeadStatus;
    estimatedDealValue: number;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardStats {
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    wonLeads: number;
    lostLeads: number;
    totalDealValue: number;
    wonDealValue: number;
}

export interface Note {
    id: string;
    leadId: string;
    noteContent: string;
    createdBy: string;
    createdAt: string;
}

export interface LeadFormData {
    leadName: string;
    companyName: string;
    email: string;
    phone: string;
    leadSource: LeadSource;
    assignedSalesperson: string;
    status: LeadStatus;
    estimatedDealValue: number;
}
