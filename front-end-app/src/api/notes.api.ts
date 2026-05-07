import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const getNotesByLead = async (leadId: string) => {
    const res = await axiosClient.get(ENDPOINTS.NOTES_BY_LEAD(leadId));
    return res.data;
};

export const createNote = async (data: any) => {
    const res = await axiosClient.post(ENDPOINTS.NOTES, data);
    return res.data;
};