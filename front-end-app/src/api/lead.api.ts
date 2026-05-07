import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

// GET all leads
export const getLeads = async () => {
    const res = await axiosClient.get(ENDPOINTS.LEADS);
    return res.data;
};

// GET single lead
export const getLeadById = async (id: string) => {
    const res = await axiosClient.get(ENDPOINTS.LEAD_BY_ID(id));
    return res.data;
};

// CREATE lead
export const createLead = async (data: any) => {
    const res = await axiosClient.post(ENDPOINTS.LEADS, data);
    return res.data;
};

// UPDATE lead
export const updateLead = async (id: string, data: any) => {
    const res = await axiosClient.put(ENDPOINTS.LEAD_BY_ID(id), data);
    return res.data;
};

// DELETE lead
export const deleteLead = async (id: string) => {
    const res = await axiosClient.delete(ENDPOINTS.LEAD_BY_ID(id));
    return res.data;
};