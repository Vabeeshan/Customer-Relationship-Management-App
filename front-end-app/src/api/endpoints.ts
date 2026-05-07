export const ENDPOINTS = {
    AUTH_LOGIN: "/auth/login",

    DASHBOARD: "/dashboard",

    LEADS: "/leads",
    LEAD_BY_ID: (id: string) => `/leads/${id}`,

    NOTES: "/notes/",
    NOTES_BY_LEAD: (id: string) => `/notes/${id}`,
};